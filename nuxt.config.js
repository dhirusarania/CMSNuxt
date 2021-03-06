export default {
    // server: { port: 3002 },
    mode: "universal",
    // server: {port:5000},
    /*
     ** Headers of the page
     */
    head: {
        title: "FT-500",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
            },
            {
                rel: "stylesheet",
                href: "/css/bootstrap.min.css"
            },
            {
                rel: "stylesheet",
                href: "/css/animate.css"
            },
            {
                rel: "stylesheet",
                href: "/css/stylesheet.css"
            },
            {
                rel: "stylesheet",
                href: "/css/responsive_style.css"
            },
            {
                rel: "stylesheet",
                href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            },
            {
                rel: "stylesheet",
                href: "/css/font-awesome.min.css"
            },
            {
                rel: "stylesheet",
                href: "/css/j1.css"
            },
            {
                rel: "stylesheet",
                href: "/css/owl.carousel.css"
            },
            {
                rel: "stylesheet",
                href: "https://cdn.plyr.io/3.5.6/plyr.css"
            },
            {
                rel: "stylesheet",
                href: "https://cdn.quilljs.com/1.3.6/quill.snow.css"
            }
        ],
        script: [{
                src: "/js/jquery-2.2.4.min.js",
                type: "text/javascript"
            },
            {
                src: "/js/bootstrap.min.js",
                type: "text/javascript"
            },
            {
                src: "/js/waypoints.js",
                type: "text/javascript"
            },
            {
                src: "/js/jquery_counterup.js",
                type: "text/javascript"
            },
            {
                src: "/js/homemap_custom.js",
                type: "text/javascript"
            },
            {
                src: "/js/jquery_custom.js",
                type: "text/javascript"
            },
            {
                src: "/js/homemap_custom.js",
                type: "text/javascript"
            },
            {
                src: "/js/jQ.js",
                type: "text/javascript"
            },
            {
                src: "/js/owl.carousel.js",
                type: "text/javascript"
            },
            {
                src: "https://cdn.plyr.io/3.5.6/plyr.polyfilled.js",
                type: "text/javascript"
            },
            {
                src: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js",
                type: "text/javascript"
            },
            {
                src: "https://formbuilder.online/assets/js/form-builder.min.js",
                type: "text/javascript"
            },
            {
                src: "https://formbuilder.online/assets/js/form-render.min.js",
                type: "text/javascript"
            },
            {
                src: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",
                type: "text/javascript"
            },
            // {
            //   src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js",
            //   type: "text/javascript"
            // },
            {
                src: "https://cdn.quilljs.com/1.3.6/quill.js",
                type: "text/javascript"
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#fff" },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [{ src: "~plugins/vue-notification.js", ssr: false }, { src: "@/plugins/timeline.js" }, { src: '~/plugins/star.js', ssr: false }],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/auth", ["@nuxtjs/component-cache", { maxAge: 1000 * 60 * 60 }]
    ],

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: "/user/login", method: "post", propertyName: "token" },
                    logout: false,
                    user: { url: "/user/user", method: "get", propertyName: "data" }
                },
                tokenRequired: true,
                tokenType: "token"
            },
            facebook: {
                client_id: "246184809764231",
                userinfo_endpoint: false,
                scope: ["public_profile", "email"],
                redirect_uri: "http://ft500.in"
            },
            google: {
                client_id: "879086255795-ve28ul2e48a6jass60vs7ssab55h91q5.apps.googleusercontent.com",
                user: false,
                redirect_uri: "http://ft500.in"
            }
        },
        redirect: {
            login: "",
            logout: "/"
        }
    },

    env: {
        client_id: 'MvpaT8AnNmGGOwKIAy8C9HmzmCMSAt5YtIbDcMiJ',
        client_secret: 'vl2yS4NHcDIFAUhCBs8zw6JqX4sCplHcD0lgmpkUXK790AwA8sT49DPi3zZQ1ONp3b1wg6vxPT06SQY0PpL9vIe7nJHMhroSfMlr5GYxmIKpr4hA8XoVQcRXq3LR81je',
        facebook_token: 'EAADf514ilYcBAKiIbICymXYoJPPdGu5FCp4nJC3AtmQSwM0ewbsDBZAc5WbBxEUqGlJwTVzuH3eKTARDSFZCk7IVhGGmqgxCXKh9wobjgGjlyEUb4lC0fhPtNmfF61Be0wMIq86c5rctZCBvWmzh9n2C7xxaCOZBiZBQSLz2rEMAbNHjMu66aJkUZCMe1b99cZD'
    },

    axios: {},
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
};