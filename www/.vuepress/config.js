module.exports = {
    title: 'Base Cube One',
    description: 'Smart Environment Automation Framework',
    head: [
        ['link', {rel: 'icon', href: '/images/bco_logo_simple_small.png'}],
    ],
    themeConfig: {
        logo: '/images/bco_logo_simple_white.png',
        nav: [
            {text: 'Installation', link: '/install/'},
            {text: 'Download', link: '/download/'},
            {text: 'User', link: '/user/'},
            {text: 'Developer', link: '/developer/'},
            {text: 'Openbase', link: 'http://openbase.org'}
        ],
        displayAllHeaders: true,
        sidebar: [
            '/',
            '/install/',
            '/download/',
            '/user/',
            '/developer/',
            '/developer/folder-structure'
        ],
        lastUpdated: 'Last Updated',
        repo: 'openbase',
        // if your docs are in a different repo from your main project:
        docsRepo: 'openbase/bco.website',
        editLinks: true,

    },
    sidebar: 'auto',
    serviceWorker: true
}
