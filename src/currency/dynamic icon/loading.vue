<template>
    <div class="lds-css ng-scope">
        <div style="width:100%;height:100%" class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>


</template>


<script>
    export default {
        name: 'loading'

    }
</script>
<style type="text/css" scoped>
    @keyframes lds-ripple {
        0% {
            top: 96px;
            left: 96px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 18px;
            left: 18px;
            width: 156px;
            height: 156px;
            opacity: 0;
        }
    }

    @-webkit-keyframes lds-ripple {
        0% {
            top: 96px;
            left: 96px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 18px;
            left: 18px;
            width: 156px;
            height: 156px;
            opacity: 0;
        }
    }

    .lds-ripple {
        position: relative;
    }

    .lds-ripple div {
        box-sizing: content-box;
        position: absolute;
        border-width: 4px;
        border-style: solid;
        opacity: 1;
        border-radius: 50%;
        -webkit-animation: lds-ripple 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        animation: lds-ripple 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .lds-ripple div:nth-child(1) {
        border-color: #ffe5cb;
    }

    .lds-ripple div:nth-child(2) {
        border-color: #f98c04;
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
    }

    .lds-ripple {
        width: 81px !important;
        height: 81px !important;
        -webkit-transform: translate(-40.5px, -40.5px) scale(0.405) translate(40.5px, 40.5px);
        transform: translate(-40.5px, -40.5px) scale(0.405) translate(40.5px, 40.5px);
    }
</style>

