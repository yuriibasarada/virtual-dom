import createElement from "../vdom/createElement";
import render from "../vdom/render";
import mount from "../vdom/mount";
import diff from '../vdom/diff'
import header from "../components/header";

const menuItems = [
    {id: 1, title: 'Home', link: '/home'},
    {id: 1, title: 'About', link: '/about-us'},
    {id: 1, title: 'Products', link: '/products'},
    {id: 1, title: 'Contact Us', link: '/contact-us'}
]

const createVApp = (count) => createElement('div', {
    attrs: {
        id: 'app',
        dataCount: count
    },
    children: [
        header(menuItems),
        createElement('span', {
            children: [
                String(count)
            ]
        }),
        createElement('input'),
        createElement('img', {
            attrs: {
                src: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
            }
        })
    ]
});

let count = 0;
let vApp = createVApp(count)
const $app =  render(vApp)

let $rootEl = mount($app, document.getElementById('app'))

setInterval(() => {
    count++
    const vNewApp = createVApp(count)
    const patch = diff(vApp, vNewApp)
    $rootEl = patch($rootEl)
    vApp = vNewApp
}, 1000)

console.log($app)