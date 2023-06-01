let obj = {
  name: "X Æ A-12 Musk",
  isActive: (function () {
    return this.name.length > 4;
  })(),
};

// and after a while I need to check if is active:

console.log(obj);

{ 
  name: 'X Æ A-12 Musk',
  isActive: [Function: isActive] 
}