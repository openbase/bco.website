module.exports = {
    title: 'basecubeone.org',
    description: 'Smart Technology Development Community',
    head: [
        ['link', {rel: 'icon', href: '/images/openbase_logo.png'}],
    ],
    themeConfig: {
        logo: '/images/openbase_logo.svg',
        nav: [
            {text: 'Projects', link: '/projects/'},
            {text: 'Contact', link: '/contact/'}
        ],
        displayAllHeaders: true,
        sidebar: [
            '/',
            '/projects/',
            '/contact/'
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
