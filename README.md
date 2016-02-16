## Random name generator

Angularjs service to generate a random male or female firstname and surname.

## Usage

* Install via [bower](http://bower.io/) or you can check out the [source](https://github.com/JVojczekhovskiy/random-name-generator) and install it yourself.

 `bower install --save random-name-generator`

 `git clone git://github.com/JVojczekhovskiy/random-name-generator`

* Add `random-name-generator` to your application's module dependencies.
* Add the `nameGenerator` service in the controller or directive dependencies u want to use the generator in.
* Include script in your HTML.

      ```html
      <script src="dist/random-name-generator.js"></script>
      ```
* Use the `random-name-generator` service.

## Example

* If you want to use the service u need to make sure the service is added in your dependencies.
* If that is done u can call the initialize function and after the generateName function, example below:
      ```
      nameGenerator.initialize(path);
      nameGenerator.generateName(firstInitial,secondInitial,gender).then(function(response){
        console.log(response);
      },function(reason){
       console.log(reason);
      });
      
      ```
* The parameters of the functions are all strings.
* The response is a string with the random name and surname seperated by a space.
