<template>
    <div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-pacman"><div><div></div><div></div><div></div></div><div><div></div><div></div></div></div></div></template>

<script>
    export default {
        name: "pacman"
    }
</script>

<style  scoped type="text/css">@keyframes lds-pacman-1 {
                           0% {
                               -webkit-transform: rotate(0deg);
                               transform: rotate(0deg);
                           }
                           50% {
                               -webkit-transform: rotate(-45deg);
                               transform: rotate(-45deg);
                           }
                           100% {
                               -webkit-transform: rotate(0deg);
                               transform: rotate(0deg);
                           }
                       }
@-webkit-keyframes lds-pacman-1 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    50% {
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
}
@keyframes lds-pacman-2 {
    0% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    50% {
        -webkit-transform: rotate(225deg);
        transform: rotate(225deg);
    }
    100% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
}
@-webkit-keyframes lds-pacman-2 {
    0% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    50% {
        -webkit-transform: rotate(225deg);
        transform: rotate(225deg);
    }
    100% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
}
@keyframes lds-pacman-3 {
    0% {
        -webkit-transform: translate(190px, 0);
        transform: translate(190px, 0);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    100% {
        -webkit-transform: translate(70px, 0);
        transform: translate(70px, 0);
        opacity: 1;
    }
}
@-webkit-keyframes lds-pacman-3 {
    0% {
        -webkit-transform: translate(190px, 0);
        transform: translate(190px, 0);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    100% {
        -webkit-transform: translate(70px, 0);
        transform: translate(70px, 0);
        opacity: 1;
    }
}
.lds-pacman {
    position: relative;
}
.lds-pacman > div:nth-child(2) div {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 120px;
    height: 60px;
    border-radius: 120px 120px 0 0;
    background: #f89708;
    -webkit-animation: lds-pacman-1 1.2s linear infinite;
    animation: lds-pacman-1 1.2s linear infinite;
    -webkit-transform-origin: 60px 60px;
    transform-origin: 60px 60px;
}
.lds-pacman > div:nth-child(2) div:nth-child(2) {
    -webkit-animation: lds-pacman-2 1.2s linear infinite;
    animation: lds-pacman-2 1.2s linear infinite;
}
.lds-pacman > div:nth-child(1) div {
    position: absolute;
    top: 92px;
    left: -8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(17.78830645161291%,3.289420001108133%,2.8566174204960464%,0.639);
    -webkit-animation: lds-pacman-3 1.2s linear infinite;
    animation: lds-pacman-3 1.2s linear infinite;
}
.lds-pacman > div:nth-child(1) div:nth-child(1) {
    -webkit-animation-delay: -0.804s;
    animation-delay: -0.804s;
}
.lds-pacman > div:nth-child(1) div:nth-child(2) {
    -webkit-animation-delay: -0.396s;
    animation-delay: -0.396s;
}
.lds-pacman > div:nth-child(1) div:nth-child(3) {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
}
.lds-pacman {
    width: 79px !important;
    height: 79px !important;
    -webkit-transform: translate(-39.5px, -39.5px) scale(0.395) translate(39.5px, 39.5px);
    transform: translate(-39.5px, -39.5px) scale(0.395) translate(39.5px, 39.5px);
}
</style>
