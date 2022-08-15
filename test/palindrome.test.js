const {palindrome} = require('../utils/for_testing.js')

test('Palindrome example', ()=>{
    const result = palindrome('reconocer')
    expect(result).toBe('reconocer')
})

test('Palindrome for an empty string', () =>{
    const result = palindrome('')
    expect(result).toBe('')
})

test('Palindrome of undefined', () =>{
    const result = palindrome()
    expect(result).toBeUndefined()
})
