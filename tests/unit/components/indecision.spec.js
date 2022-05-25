import Indecision from "@/components/Indecision";
import { shallowMount } from "@vue/test-utils";

describe('Indecision Component', () => {

    let wrapper;
    let consoleLogSpy;
    let getAnswerSpy;

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        consoleLogSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks();
        getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
    });

    test('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("shouldn't trigger anything when writing (console.log) ", async () => {
        //console.log(wrapper.vm)
        const input = wrapper.find('input');
        await input.setValue('Testing trigger');
        expect(consoleLogSpy).toHaveBeenCalled();
        //checking getAnswer method isn't called
        expect(getAnswerSpy).not.toHaveBeenCalled();
    });

    test('should trigger the getAnswer method when "?" is pressed', async () => {
        const input = wrapper.find('input');
        await input.setValue('Testing trigger?');
        expect(consoleLogSpy).toHaveBeenCalled();
        expect(getAnswerSpy).toHaveBeenCalled();
    });

    test('testing getAnswer', async() => {

        await wrapper.vm.getAnswer();
        const img = wrapper.find('img');
        const answer = wrapper.vm.answer;
        const imgUrl = wrapper.vm.img;
        expect(img).toBeTruthy();
        expect(answer).toBe('yes');
        expect(imgUrl).toBe('https://yesno.wtf/assets/yes/2.gif');

    });

    test('getAnswer method should work when API fails', async () => { 
        
        fetch.mockImplementationOnce( () => Promise.reject('API is down') );

        await wrapper.vm.getAnswer();
        const img = wrapper.find('img')
        const answer = wrapper.vm.answer;
        const imgUrl = wrapper.vm.img;
        expect(img.exists()).toBeFalsy();
        expect(answer).toBe('Internal Server Error');
        expect(imgUrl).toBeNull();
    })
})