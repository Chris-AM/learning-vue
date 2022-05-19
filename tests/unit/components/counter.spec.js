
import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe('Counter Component', () => {
    let wrapper;
    beforeEach(()=> {
        wrapper = shallowMount(Counter);
    })
    //Snapshot: test that the component renders correctly
    // test('shoud match with snapshot', () => {
    //  
    //     expect( wrapper.html() ).toMatchSnapshot();
    // })
    test('should render default title "Counter"', () => {
        expect(wrapper.find('h2').exists()).toBeTruthy();
        const title =  wrapper.find('h2').text();
        expect(title).toBe('Counter');
    });
    test('the default counter value should be 1', () => {
        //Wrapper
        //pTags
        // const secondPTag = wrapper.findAll('p').at(1).text();
        const value = wrapper.find('[data-testid="counter"]').text()
        //expect second p === 1
        expect(value).toBe('1');
    });
    // test('should increment the counter by 1', async () => {
    //  
    //     const increaseBtn = wrapper.find('[data-testid="increase"]');
    //     await increaseBtn.trigger('click');
    //     const value = wrapper.find('[data-testid="counter"]').text()
    //     expect(value).toBe('2');
    // });
    // test('should decrement the counter by 2', async () => {
    //  
    //     const increaseBtn = wrapper.find('[data-testid="decrease"]');
    //     await increaseBtn.trigger('click');
    //     await increaseBtn.trigger('click');
    //     const value = wrapper.find('[data-testid="counter"]').text()
    //     expect(value).toBe('-1');
    // });
    test('should increment by 1 and decrease by 2', async() => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');
        await increaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        const value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe('-1');
    });
    test('should set default value (1)', ()=> {
        const { start } = wrapper.props();
        const value = wrapper.find('[data-testid="counter"]').text()
        expect(Number(value)).toBe(start);
    });
    //testing computed options
    test('should show proptitle',() => {
        const title = 'testing props';
        const wrapper = shallowMount(Counter, {
            props:{
                title
            }
        });
        expect(wrapper.find('h2').text()).toBe('testing props');
    });
})