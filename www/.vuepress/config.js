module.exports = {
    title: 'Base Cube One',
    description: 'Smart Environment Automation Framework',
    head: [
        ['link', {rel: 'icon', href: '/images/bco_logo_simple_small.png'}],
    ],
    plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
          '\\Z': '\\mathbb{Z}'
        },
      },
    ],
    ],
    themeConfig: {
        logo: '/images/bco_logo_simple_white.png',
        nav: [
            {text: 'Installation', link: '/user/installation'},
            {text: 'User', link: '/user/'},
            {text: 'Developer', link: '/developer/'},
            {text: 'Openbase', link: 'https://openbase.org'}
        ],
        displayAllHeaders: false,
        sidebar: {
            '/user/': [
                '',
                '/user/bcozy',
                '/user/bcomfy'
            ],

            '/developer/': [
                '',
                '/developer/installation',
                '/developer/startup-tools',
                '/developer/directory-structure',
                '/developer/architecture',
                '/developer/authentication/',
                '/developer/contribution',
                '/developer/code-examples',
                '/developer/ui/'
            ],

            /* fallback */
            '/': [
                '', /* / */
                '/user/installation',
                '/user/',
                '/developer/'
            ]
        },
        lastUpdated: 'Last Updated',
        repo: 'openbase',
        // if your docs are in a different repo from your main project:
        docsRepo: 'openbase/bco.website',
        docsDir: 'www',
        editLinks: true,
        serviceWorker: {
            updatePopup: true // Boolean | Object, default to undefined.
            // If set to true, the default text config will be:
            // updatePopup: {
            //    message: "New content is available.",
            //    buttonText: "Refresh"
            // }
        }
    },
    markdown: {
        lineNumbers: true
    },

    //sidebar: 'auto',
    serviceWorker: true
}
