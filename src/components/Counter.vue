<template>
    <h2>{{ customTitle }}</h2>
    <h3>With methods</h3>
    <p>{{ count }} <sup>2</sup> = {{ squareValue }}</p>
    <div>
        <button @click="increase" >+1</button>
        <button @click="decrease">-1</button>
    </div>
</template>

<script>
export default {
    name: 'Counter',
    props: ['title'],
    data() {
        return {
            count: 0
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