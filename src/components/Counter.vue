<template>
    <h2>{{ customTitle }}</h2>
    <p>{{ count }} <sup>2</sup> = {{ squareValue }}</p>
    <p  data-testid="counter">{{ count }}</p>
    <div class="buttons-container">
        <button data-testid="increase" @click="increase" >+1</button>
        <button data-testid="decrease" @click="decrease" >-1</button>
    </div>
</template>

<script>
export default {
    name: 'Counter',
    props: {
        title: String,
        start: {
            type: Number,
            default: 1,
            validator ( value ) {
                return value >= 0;
            }
            //required: true,
        }
    },
    data() {
        return {
            count: this.start
        }
    },
    methods: {
        // getSquareValue() {
        //     console.log('getSquareValue');
        //     return this.count * this.count;
        // }
        increase() {
            this.count++;
        },
        decrease() {
            this.count--;
        }
    },
    computed: {
        squareValue() {
            return this.count * this.count;
        },
        customTitle() {
            return this.title || 'Counter';
        }
    }
}
</script>

<style>
button {
    background-color: #64B687;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}
button:hover {
    background-color: #2c3e50;
    transition: 0.3s ease-in-out;
}
</style>