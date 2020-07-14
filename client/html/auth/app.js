Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            errorMessage: null,
            registering: false,
            lostPassword: false,
            tokenSent: false,
            splashscreen: true,
            email: '',
            password: '',
            password2: '',
            token: '',
            locale: {
                headers: {
                    lostPassword: 'Lost Password?',
                    userLogin: 'User Login',
                    userRegistration: 'User Registration'
                },
                desc: {
                    tokenNotSent: 'We will send an email with a code to help you recover your account.',
                    tokenSent:
                        'You should recieve an email with a token within 5 minutes. Check your spam folder as well.',
                    existingAccount: 'Login to your existing account using your email and password.',
                    newAccount: `New to the server? Fill out the information below and we'll get you started.`
                },
                buttons: {
                    lostPasswordBtn: 'Lost Password?',
                    newAccountBtn: 'New Account?',
                    existingAccountBtn: 'Existing Account?',
                    registerBtn: 'Submit',
                    loginBtn: 'Submit',
                    returnToLoginBtn: 'Return to Login',
                    requestTokenBtn: 'Request Token',
                    submitTokenBtn: 'Submit Token'
                },
                website: 'http://www.stuyk.com/'
            }
        };
    },
    computed: {},
    methods: {
        website() {
            window.open(this.locale.website);
        },
        setError(msg) {
            this.errorMessage = msg;
        },
        setEmail(email) {
            this.email = email;
        },
        toggleMode() {
            this.errorMessage = null;
            this.registering = !this.registering;
        },
        toggleLostPassword() {
            this.errorMessage = null;
            this.lostPassword = !this.lostPassword;
            this.registering = false;
        },
        processLostPassword() {
            this.errorMessage = null;

            if (this.email === '' || this.email === null) {
                this.setError('Must specify a email.');
                return;
            }

            this.tokenSent = true;
        },
        processLoginEnter(e) {
            if (e.key !== 'Enter') {
                return;
            }

            this.processRegistration(false);
        },
        processRegistrationEnter(e) {
            if (e.key !== 'Enter') {
                return;
            }

            this.processRegistration(true);
        },
        processRegistration(register = false) {
            this.errorMessage = null;

            if (this.email === '' || this.email === null) {
                this.setError('Must specify a email.');
                return;
            }

            if (this.password === '') {
                this.setError('Must specify a password.');
                return;
            }

            if (this.email.length <= 3) {
                this.setError('Email must be atleast 4 characters.');
                return;
            }

            if (!this.email.includes('@')) {
                this.setError('Must be a valid email address.');
                return;
            }

            if (this.password.length <= 3) {
                this.setError('Password must be atleast 4 characters.');
                return;
            }

            if (this.registering && this.password !== this.password2) {
                this.setError('Passwords do not match.');
                return;
            }

            if ('alt' in window) {
                alt.emit('registration:Route', this.email, this.password, register);
            } else {
                console.log(`${this.email} / ${this.password} / isRegistering: ${register}`);
            }
        }
    },
    mounted() {
        if ('alt' in window) {
            alt.on('registration:Error', this.setError);
            alt.on('registration:SetEmail', this.setEmail);
            alt.emit('registration:Ready');
        }

        setTimeout(() => {
            this.splashscreen = false;
        }, 1);
    },
    updated() {},
    watch: {}
});
