<template>
    <img v-if="img" :src="img" alt="bg">
    <div class="bg-dark">

    </div>
    <div class="indecision-container">
        <input v-model="question" @keypress.enter="newQuestion" type="text" placeholder="Do me a question" >
        <p>Questions must be finished with question mark (?)</p>
        <div v-if="isAValidQuestion">
            <h2>{{ question }}</h2>
            <!-- <h1>{{ answer === 'yes' ? 'sí': 'no!'  }}</h1> -->
            <h1>{{ answer }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Indecision',
    props: {

    },
    data() {
        return {
            question: null,
            answer: null,
            img: null,
            isAValidQuestion: false
        }
    },
    methods: {
        async getAnswer () {
            try {
                this.answer = "Thinking ..."
                const {answer, image} = await fetch('https://yesno.wtf/api').then(r => r.json());
                //console.log('{answer, image} ===> ', {answer, image})
                this.answer = answer;
                this.img = image;
            } catch (error) {
                console.log('Indecision component: ', error)
                this.answer = 'Internal Server Error'
                this.img = null;
            }
        }
    },
    watch: {
        question( value, oldvalue ){
            this.isAValidQuestion = false;
            console.log('value ===> ', {value});
            if(!value.includes('?')) return;
            this.isAValidQuestion = true;
            this.getAnswer();
        }
    }
}
</script>

<style >
img,
.bg-dark {
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
}

.bg-dark {
    background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
    position: relative;
    z-index: 99;
}

input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
}

input:focus {
    outline: none;
}

p {
    color: white;
    font-size: 20px;
    margin-top: 0px;
}

h1,
h2 {
    color: white;
}

h2 {
    margin-top: 150px;
}
</style>