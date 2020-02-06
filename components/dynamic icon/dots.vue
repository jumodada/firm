<template>
    <div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
</template>

<script>
    export default {
        name: "dots"
    }
</script>
<style  scoped type="text/css">@keyframes lds-ellipsis3 {
                           0%, 25% {
                               left: 32px;
                               -webkit-transform: scale(0);
                               transform: scale(0);
                           }
                           50% {
                               left: 32px;
                               -webkit-transform: scale(1);
                               transform: scale(1);
                           }
                           75% {
                               left: 100px;
                           }
                           100% {
                               left: 168px;
                               -webkit-transform: scale(1);
                               transform: scale(1);
                           }
                       }
@-webkit-keyframes lds-ellipsis3 {
    0%, 25% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    50% {
        left: 32px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    75% {
        left: 100px;
    }
    100% {
        left: 168px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    25%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}
@-webkit-keyframes lds-ellipsis2 {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    25%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}
@keyframes lds-ellipsis {
    0% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    25% {
        left: 32px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    50% {
        left: 100px;
    }
    75% {
        left: 168px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        left: 168px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}
@-webkit-keyframes lds-ellipsis {
    0% {
        left: 32px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    25% {
        left: 32px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    50% {
        left: 100px;
    }
    75% {
        left: 168px;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    100% {
        left: 168px;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
}
.lds-ellipsis {
    position: relative;
}
.lds-ellipsis > div {
    position: absolute;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
}
.lds-ellipsis div > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f00;
    position: absolute;
    top: 100px;
    left: 32px;
    -webkit-animation: lds-ellipsis 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
}
.lds-ellipsis div:nth-child(1) div {
    -webkit-animation: lds-ellipsis2 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis2 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #34a0e8;
}
.lds-ellipsis div:nth-child(2) div {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
    background: #74b6f9;
}
.lds-ellipsis div:nth-child(3) div {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
    background: #afd6f1;
}
.lds-ellipsis div:nth-child(4) div {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    background: #409eff;
}
.lds-ellipsis div:nth-child(5) div {
    -webkit-animation: lds-ellipsis3 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis3 2s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #34a0e8;
}
.lds-ellipsis {
    width: 20px !important;
    height: 20px !important;
    -webkit-transform: translate(-10px, -10px) scale(0.1) translate(10px, 10px);
    transform: translate(-10px, -10px) scale(0.1) translate(10px, 10px);
}
</style>
