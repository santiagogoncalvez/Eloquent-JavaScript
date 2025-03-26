for (let i = 1; i <= 50; i++) {
  if (i % 3 != 0 && i % 5 != 0) {
    console.log(i);
  } else {

    if (i % 3 == 0 && i % 5 == 0) {
      console.log("FizzBuzz");

    } else {

      if (i % 3 == 0) {
        console.log("Fizz");

      } else {

        console.log("Buzz");

      }
    }
  }
}