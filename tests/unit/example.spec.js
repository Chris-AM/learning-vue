//test suite
describe('Example component', ()=> {
  //test (brief description, function to test)
  test( 'Should be greater than 10', ()=> {
    //Arrange
    let value = 5;
    //Act
    value = value + 6;
    //Assert
    expect(value).toBeGreaterThan(10);
  } );

})