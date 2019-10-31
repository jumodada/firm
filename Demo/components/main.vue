<template>
    <div class="wrapper">
        <div class="main-logo" ref="logo">
            <div class="logo-animation-wrapper">
                <div class="logo-animation">
                    <div class="anime-logo">
                        <div class="anime-logo-signs">
                            <div class="logo-letter letter-f">
                                <svg class="bounced" stroke="#fafaf1" stroke-width="24" viewBox="0 0 1024 1024" width="200" height="240">
                                    <path  d="M194.947049 1024V0h634.105902v173.310211H401.660746v242.444651h427.392205v173.094704H401.660746v435.150434H194.947049z"
                                          p-id="2837"></path>
                                </svg>
                            </div>
                            <div class="logo-letter i"  style="transform: translateX(-20px)">
                                <svg class="bouncedI" stroke="#fafaf1" stroke-width="24" viewBox="0 0 1024 1024" width="200" height="240">
                                    <path  d="M339.184561 981.185892l0-902.556067 299.217802 0 0 902.556067L339.184561 981.185892z" p-id="1539"></path>
                                </svg>
                            </div>
                            <div class="logo-letter letter-r" style="transform: translateX(-31px)">
                                <svg class="bouncedR" stroke="#fafaf1" stroke-width="24" viewBox="0 0 1024 1024" width="200" height="240" fill="none"
                                     fill-rule="evenodd">
                                    <path d="M184.1946875 921.7559375V116.2934375h341.85375c86.634375 0 147.5128125 7.02375 187.3171875 21.0721875s70.2440625 39.8053125 93.6590625 77.26875 35.1215625 79.6096875 35.1215625 126.43875c0 60.8784375-18.73125 110.0484375-53.85375 149.85375s-88.9753125 63.219375-159.219375 74.926875c35.1215625 21.073125 63.219375 42.14625 86.634375 67.903125s53.85375 67.90125 91.3171875 131.1215625c28.096875 44.4871875 49.17 77.26875 60.8775 98.3409375 7.0246875 14.049375 35.1225 32.780625 84.2925 58.5375H711.0246875L593.9515625 746.1453125c-42.14625-63.219375-70.2440625-103.0246875-86.634375-119.415s-32.780625-28.096875-49.1709375-32.7796875-44.488125-9.365625-81.9515625-9.365625h-32.7796875v337.17H184.19375z m163.903125-463.6096875h119.4140625c77.26875 0 126.4396875-2.3409375 145.171875-9.365625s35.1215625-18.73125 44.4871875-35.1225 16.3903125-35.1215625 16.3903125-60.8775c0-28.096875-7.0246875-49.1709375-21.073125-65.56125s-35.1225-28.096875-60.8784375-30.43875c-14.0484375-2.341875-51.511875-2.341875-119.415-2.341875H345.7559375v203.7075z"
                                          p-id="2240">
                                    </path>
                                </svg>
                            </div>
                            <div class="logo-letter letter-m">
                                <svg class="bouncedM" stroke="#d81e06" stroke-width="30"  fill="#313639" viewBox="0 0 1024 1024" width="200" height="240">
                                    <path d="M687.20223618 184.37585068L512 359.573452l-175.20223618-175.19760132H116.4921875v655.24829864h233.88261795V528.70866013l145.20544052 145.20389556 16.41820908 16.35486604 0.18693924-0.1884842 0.03398894 0.032444 161.40581132-161.40581131V839.62260437H907.5078125V184.37585068H687.20223618zM861.15924072 793.27557754h-141.1854744V416.81084824L511.99845505 624.78615952 304.02623367 416.81393814v376.4616394H162.84075928V230.72442246h154.75942612L512 425.1196022 706.3998146 230.72442246H861.15924072v562.55115508z"
                                          p-id="1396" fill="#fafaf1"></path>
                                </svg>
                            </div>
                            <div class="bounce">
                                <svg viewBox="0 0 1000 260" width="1000" height="260" fill="none">
                                    <path d="M630,240 C630,111.154418 608.971354,40 530.160048,40 C451.348741,40 430,127.460266 430,210"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dot" ref="dot"></div>
        </div>
        <div class="description" ref="description">
            A vue-based UI Library
        </div>
        <div class="liner-enter">

        </div>
    </div>
</template>

<script>
    import anime from 'animejs/lib/anime.es'

    export default {
        name: "Main",
        mounted() {
            this.addToLogo(this.$refs.logo)
            this.addToDot(this.$refs.dot)
            this.addDescription(this.$refs.description)
        },
        methods: {
            addDescription(){
                let target = this.init('description')
                    .add({
                        targets:'.description',
                        opacity:1,
                        duration:700,
                        color:'#f8ba0b',
                        translateY: {
                            value: -20,
                            duration: 500,
                            endDelay: 20,
                            easing: 'easeInOutSine'
                        },
                        delay:5000
                    })
                target.play()
            },
            addToLogo() {
                let target = this.init('logo')
                    .add({
                        targets: '.bounced',
                        transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
                        translateY: [
                            {
                                value: [150, -160],
                                duration: 190,
                                endDelay: 20,
                                easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'
                            },
                            {value: 4, duration: 120, easing: 'easeInQuad'},
                            {value: 6, duration: 120, easing: 'easeInQuad'},
                        ],
                        scaleX: [
                            {value: [.25, .85], duration: 190, easing: 'easeOutQuad'},
                            {value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine'},
                            {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
                        ],
                        scaleY: [
                            {value: [.3, .8], duration: 120, easing: 'easeOutSine'},
                            {value: .35, duration: 120, delay: 180, easing: 'easeInOutSine'},
                            {value: .43, duration: 180, delay: 25, easing: 'easeOutQuad'},
                            {value: .53, duration: 190, delay: 15, easing: 'easeOutQuad'}
                        ],
                        delay: anime.stagger(80)
                    }, 1000)
                    .add({
                        targets: '.bounced path',
                        duration: 1000,
                        fill:'#fafaf1',
                        strokeDashoffset: [anime.setDashoffset, 0],
                        direction: 'alternate',
                        delay: 500
                    })
                    .add({
                        targets: '.bouncedI path',
                        duration: 600,
                        fill:'#fafaf1',
                        strokeDashoffset: [anime.setDashoffset, 0],
                        direction: 'alternate',
                        delay: 0
                    })
                    .add({
                        targets: '.bouncedR path',
                        duration: 1000,
                        fill:'#fafaf1',
                        strokeDashoffset: [anime.setDashoffset, 0],
                        direction: 'alternate',
                        delay: 0
                    })
                    .add({
                        targets: '.bouncedM path',
                        duration: 1000,
                        strokeDashoffset: [anime.setDashoffset, 0],
                        fill: ['#cc3133', '#cc8a3a', '#c34ccc'],
                        delay: 100
                    })
                    .add({
                        targets: '.bouncedI',
                        transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
                        translateY: [
                            {
                                value: [150, -160],
                                duration: 190,
                                endDelay: 20,
                                easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'
                            },
                            {value: 4, duration: 120, easing: 'easeInQuad'},
                            {value: 12, duration: 120, easing: 'easeOutQuad'}
                        ],
                        scaleX: [
                            {value: [.25, .85], duration: 190, easing: 'easeOutQuad'},
                            {value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine'},
                            {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
                        ],
                        scaleY: [
                            {value: [.3, .8], duration: 120, easing: 'easeOutSine'},
                            {value: .45, duration: 120, delay: 180, easing: 'easeInOutSine'},
                            {value: .56, duration: 180, delay: 25, easing: 'easeOutQuad'},
                            {value: .61, duration: 190, delay: 15, easing: 'easeOutQuad'}
                        ],
                        delay: anime.stagger(80)
                    }, 1000)
                    .add({
                        targets: '.bouncedM',
                        transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
                        translateY: [
                            {
                                value: [150, -160],
                                duration: 190,
                                endDelay: 20,
                                easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'
                            },
                            {value: 4, duration: 120, easing: 'easeInQuad'},
                            {value: 32, duration: 120, easing: 'easeOutQuad'}
                        ],
                        scaleX: [
                            {value: [.25, .85], duration: 190, easing: 'easeOutQuad'},
                            {value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine'},
                            {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
                        ],
                        scaleY: [
                            {value: [.3, .8], duration: 120, easing: 'easeOutSine'},
                            {value: .35, duration: 120, delay: 180, easing: 'easeInOutSine'},
                            {value: .57, duration: 180, delay: 25, easing: 'easeOutQuad'},
                            {value: .75, duration: 190, delay: 15, easing: 'easeOutQuad'}
                        ],
                        delay: anime.stagger(80)
                    }, 1000)
                    .add({
                        targets: '.bouncedR',
                        transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
                        translateY: [
                            {
                                value: [150, -160],
                                duration: 190,
                                endDelay: 20,
                                easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'
                            },
                            {value: 7, duration: 120, easing: 'easeInQuad'},
                            {value: 17, duration: 120, easing: 'easeOutQuad'}
                        ],
                        scaleX: [
                            {value: [.25, .85], duration: 190, easing: 'easeOutQuad'},
                            {value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine'},
                            {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
                        ],
                        scaleY: [
                            {value: [.3, .8], duration: 120, easing: 'easeOutSine'},
                            {value: .25, duration: 120, delay: 180, easing: 'easeInOutSine'},
                            {value: .50, duration: 180, delay: 25, easing: 'easeOutQuad'},
                            {value: .65, duration: 190, delay: 15, easing: 'easeOutQuad'}
                        ],
                        delay: anime.stagger(80)
                    }, 1000)
                    .add({
                        targets: '.letter-r .line',
                        easing: 'easeOutElastic(1, .8)',
                        duration: 600,
                        d: el => el.dataset.d2
                    }, '-=140')
                    .add({
                        targets: ['.letter-f', '.i', '.letter-i', '.letter-m'],
                        easing: 'easeOutElastic(1, .6)',
                        duration: 800,
                        delay: anime.stagger(40, {from: 2.5}),
                        change: function (a) {
                            a.animatables[2].target.removeAttribute('stroke-dasharray');
                        }
                    }, '-=600')
                    .add({
                        targets: '.letter-r .line',
                        d: el => el.dataset.d3,
                        easing: 'spring(.2, 200, 3, 60)',
                    }, '-=680')
                    .add({
                        targets: '.letter-i .line',
                        transformOrigin: ['50% 100% 0', '50% 100% 0'],
                        d: el => el.dataset.d2,
                        backgroundColor: '#FFF',
                        fill: '#ff5134',
                        easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
                        duration: 80
                    }, '-=670')
                target.play()
            },
            addToDot() {
                let target = this.init('dot')
                target.add({
                    targets: '.dot',

                    translateY: [
                        {
                            value: [-150, -200],
                            duration: 500,
                            endDelay: 20,
                            easing: 'easeInOutSine'
                        },
                        {
                            value: [-200, -360],
                            duration: 500,
                            endDelay: 20,
                            easing: 'easeInOutSine'
                        },
                        {value: [-360, -100], duration: 300, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
                        {value: [-100, -300], duration: 260, easing: 'cubicBezier(.9, 1, 0.115, 0.180)'},
                        {value: [-300, -100], duration: 400, easing: 'cubicBezier(0.225, 1, 0.7, 0.980)'},
                        {value: [-100, -230], duration: 350, easing: 'cubicBezier(.9, 1, 0.115, 0.180)'},
                        {value: [-230, -100], duration: 500, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
                        {value: [-100, -120], duration: 400, easing: 'cubicBezier(.9, 1, 0.115, 0.180)'},
                        {value: [-120, -100], duration: 500, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
                    ],
                    translateX: [
                        {value: -400, duration: 300, endDelay: 30, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
                        {value: -250, duration: 300, easing: 'easeInQuad'},
                        {value: -200, duration: 300, easing: 'easeOutQuad'},
                        {value: -100, duration: 300, easing: 'easeOutQuad'},
                        {value: 0, duration: 600, easing: 'easeOutQuad'},
                        {value: 100, duration: 600, easing: 'easeOutQuad'},
                        {value: 200, duration: 600, easing: 'easeOutQuad'},
                        {value: 300, duration: 500, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'}
                    ],
                    scaleX: [
                        {value: [.25, .85], duration: 190, easing: 'easeOutQuad'},
                        {value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine'},
                        {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
                    ],
                    scaleY: [
                        {value: [.3, .8], duration: 120, easing: 'easeOutSine'},
                        {value: .35, duration: 120, delay: 180, easing: 'easeInOutSine'},
                        {value: .57, duration: 180, delay: 25, easing: 'easeOutQuad'},
                        {value: .5, duration: 190, delay: 15, easing: 'easeOutQuad'},
                        {value: .6, duration: 190, delay: 15, easing: 'easeOutQuad'},
                        {value: .7, duration: 190, delay: 15, easing: 'easeOutQuad'},
                        {value: 1, duration: 190, delay: 15, easing: 'easeOutQuad'}
                    ],
                    delay: anime.stagger(80)
                }, 2000)
                target.play()
            },
            init(name) {
                let logoAnimationEl = this.$refs[name]
                this.animeSet(logoAnimationEl, 0)
                return anime.timeline({
                    autoplay: false,
                    easing: 'easeOutSine'
                })
            },
            animeSet(el) {
                anime.set(el, {scale: 1})
            }
        }

    }
</script>

<style scoped>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100vh;
    }

    .dot {
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: calc(100vh - 300px);
    }

    .main-logo {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex-direction: column;
        width: 60vw;
    }

    .logo-animation-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 12%;
    }

    .logo-animation {
        pointer-events: none;
        overflow: visible;
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1000px;
        height: 240px;
        margin: -120px 0 0 -451px;
        transform: scale(.633333);
    }

    .anime-logo {
        overflow: visible;
        position: relative;
        display: flex;
        flex-direction: column;
        width: 1000px;
        height: 120px;
    }

    .anime-logo-signs {
        overflow: visible;
        display: flex;
        align-items: flex-end;
        position: relative;
        width: 100%;
        height: 512px;
        margin-top: -352px;
    }

    .logo-letter {
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        height: 100%;
    }

    .bounced {
        transform-origin: 50% 100% 0;
        transform: translateY(200px) scaleX(.55) scaleY(.8);
    }

    .logo-animation .bounce {
        overflow: visible;
        position: absolute;
        left: 0;
        bottom: 70px;
    }

    .logo-animation .logo-letter svg {
        overflow: visible;
        fill: none;
        fill-rule: evenodd;
    }

    .logo-animation .line {
        fill: none;
        fill-rule: evenodd;
    }
    .description{
        color: white;
        margin-top: 30px;
        font-size: 27px;
        opacity: 0;
    }
   

</style>
