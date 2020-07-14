Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            show: false,
            errorMessage: null,
            registering: false,
            processing: false,
            email: '',
            username: '',
            password: '',
            password2: ''
        };
    },
    methods: {
        setReady() {
            this.show = true;
        },
        setError(msg) {
            this.processing = false;
            this.errorMessage = msg;
        },
        setEmail(email) {
            this.email = email;
        },
        toggleMode() {
            this.errorMessage = null;
            this.registering = !this.registering;
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
            this.processing = true;

            if (this.username === '') {
                this.setError('Must specify a username.');
                return;
            }

            if (this.username.length <= 3) {
                this.setError('Username must be atleast 4 characters.');
                return;
            }

            if (this.password === '') {
                this.setError('Must specify a password.');
                return;
            }

            if (this.password.length <= 3) {
                this.setError('Password must be atleast 4 characters.');
                return;
            }

            if (register) {
                if (this.email === '' || this.email === null) {
                    this.setError('Must specify a email.');
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

                if (this.password !== this.password2) {
                    this.setError('Passwords do not match.');
                    return;
                }
            }

            if ('alt' in window) {
                if (this.registering) {
                    alt.emit('auth:Try', this.username, this.password, this.email);
                    return;
                }

                alt.emit('auth:Try', this.username, this.password);
            }
        }
    },
    mounted() {
        if ('alt' in window) {
            alt.on('auth:Error', this.setError);
            alt.on('auth:SetEmail', this.setEmail);
            alt.on('auth:Ready', this.setReady);
            alt.emit('auth:Ready');
        } else {
            this.setReady();
        }
    }
});
