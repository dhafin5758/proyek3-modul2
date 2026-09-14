
const nilai = 67
function tentukanstatus(nilai) {
    return nilai >= 60 ? 'lulus' : 'mff blm lulus'
}

function tampilkanstatus(elemen, status) {

    elemen.textContent = status
}

const status = tentukanstatus(nilai);
tampilkanstatus(document.getElementById('hasil'), status);
