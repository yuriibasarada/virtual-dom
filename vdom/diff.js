import render from "./render";
const zip = (xs, ys) => {
    const zipped = []
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped
}

const diffAttrs = (oldAttr, newAttrs) => {
    const patches = []

    // add new attributes
    for(const [k, v] of Object.entries(newAttrs)) {
        patches.push($node => {
            $node.setAttribute(k, v);
            return $node
        })
    }

    // remove old attributes
    for(const k of Object.entries(oldAttr)) {
        if(!(k in newAttrs)) {
            patches.push($node => {
                $node.removeAttribute(k);
                return $node;
            })
        }
    }

    return $node => {
        for (const path of patches) {
            path($node)
        }
    }
}

const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = []
    for (const [oldVChild, newVChild] of zip(oldVChildren, newVChildren)) {
        childPatches.push(diff(oldVChild, newVChild))
    }

    const additionalPatches = [];
    for (const additionalVPath of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVPath))
            return $node;
        })
    }

    return $parent => {
        for (const [path, child] of zip(childPatches, $parent.childNodes)) {
            path(child)
        }
        for (const patch of additionalPatches) {
            patch($parent)
        }
        return $parent;
    }
}


const diff = (vOldNode, vNewNode) => {
    if(vNewNode === undefined) {
        return  $node =>  {
            $node.remove()
            return undefined;
        }
    }

    if(typeof vOldNode === 'string' || typeof vNewNode === 'string') {
        if(vOldNode !== vNewNode) {
            return $node => {
                const $newNode = render(vNewNode)
                $node.replaceWith($newNode)
                return $newNode
            }
        } else {
            return $node => undefined
        }
    }

    if(vOldNode.tagName !== vNewNode.tagName) {
        return  $node =>  {
            const $newNode = render(vNewNode)
            $node.replaceWith($newNode)
            return $newNode
        }
    }

    const pathAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs)
    const pathChildren = diffChildren(vOldNode.children, vNewNode.children)

    return $node => {
        pathAttrs($node)
        pathChildren($node)

        return $node
    }
}

export default diff;