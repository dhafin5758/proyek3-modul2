const harga = 20000
const jumlah = 3
const subtotal = harga * jumlah 
const mendapatdiskon = subtotal >=50000
const stokcukup = jumlah <= 5

console.log(`${ subtotal, mendapatdiskon, stokcukup}`)
console.log(mendapatdiskon && stokcukup)

function hitungdiskon(subtotal) {
    if (subtotal >= 20000){
        return 0.2
    }

    if (subtotal >= 10000){

        return 0.1
    }
}

console.log(hitungdiskon(subtotal))