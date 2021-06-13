import createElement from "../vdom/createElement";

const header = (menuItems) => createElement('header', {
  attrs: {},
  children: [
    createElement('div', {
      attrs: {
        class: 'container header-container'
      },
      children: [
        createElement('img', {
          attrs: {
            src: require('../assets/test.png')
          },
        }),
        createElement('ul', {
          children: [
            ...Array.from(menuItems,
              (el) => createElement('li', {
                children: [
                  createElement('a', {
                    attrs: {
                      href: el.link
                    },
                    children: [
                      String(el.title)
                    ]
                  })
                ]
              })
            )
          ]
        })
      ]
    }),
  ]
});

export default header;