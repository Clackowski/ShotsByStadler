
import { readFile, readFileSync } from 'fs';




import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

eventEmitter.on('Login', function(a,b) {
    const userdata = readFileSync('./userdata.json', 'utf8');
    console.log('Login Button pressed');
})

eventEmitter.on('CreateNewAccount', function(first, last, username, email, password, confirm_password) {
    console.log('you made it here!!!');
    
    //const userdata = readFileSync('./userdata.json', 'utf8');
    //console.log('New Account Button pressed');
})

function test() {
    eventEmitter.emit('Login');
}