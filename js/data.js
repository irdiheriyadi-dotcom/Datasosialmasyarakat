/* ============================================
   DATA MANAGEMENT - data.js
   ============================================ */

// Data store object
const dataStore = {
    tempatIbadah: [],
    penerimaBantuan: [],
    dasawisma: [],
    posyandu: [],
    rt: [],
    usiaAnak: []
};

// Initialize data from localStorage
function initializeData() {
    const savedData = localStorage.getItem('datasosialmasyarakat');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            Object.assign(dataStore, parsed);
        } catch (e) {
            console.error('Error loading data:', e);
            loadSampleData();
        }
    } else {
        loadSampleData();
    }
}

// Load sample data for first time
function loadSampleData() {
    dataStore.tempatIbadah = [
        {
            id: 1,
            namaTempat: 'Masjid Al-Ikhlas',
            jenis: 'Masjid',
            pengurus: 'Ahmad Syaiful',
            noHpPengurus: '082123456789',
            alamat: 'Jl. Merdeka 10',
            koordinat: '-6.2088,106.8456',
            status: 'Aktif'
        },
        {
            id: 2,
            namaTempat: 'Gereja Kristus Raja',
            jenis: 'Gereja',
            pengurus: 'Budi Santoso',
            noHpPengurus: '081987654321',
            alamat: 'Jl. Sudirman 5',
            koordinat: '-6.2100,106.8500',
            status: 'Aktif'
        }
    ];

    dataStore.penerimaBantuan = [
        {
            id: 1,
            nik: '3201010101010101',
            nama: 'Budi Santoso',
            jenisBantuan: 'Sembako',
            tanggal: '15-01-2024',
            jumlah: 1,
            status: 'Aktif'
        }
    ];

    dataStore.dasawisma = [
        {
            id: 1,
            namaDasawisma: 'Dasawisma Maju',
            alamat: 'Jl. Sudirman 5',
            rt: '01',
            ketua: 'Siti Nurhaliza',
            noHpKetua: '081987654321',
            sekretaris: 'Rini',
            bendahara: 'Budi',
            jumlahAnggota: 10,
            status: 'Aktif'
        }
    ];

    dataStore.posyandu = [
        {
            id: 1,
            namaPosyandu: 'Posyandu Sehat',
            ketua: 'Ibu Minah',
            noHp: '082111111111',
            balita: 15,
            lansia: 8,
            status: 'Aktif'
        }
    ];

    dataStore.rt = [
        {
            id: 1,
            noRT: '01',
            ketua: 'Pak Rahmat',
            noHp: '081555555555',
            jumlahKK: 20,
            lakilaki: 42,
            perempuan: 38,
            alamat: 'Jl. Merdeka',
            status: 'Aktif'
        }
    ];

    dataStore.usiaAnak = [
        {
            id: 1,
            nama: 'Adi Pratama',
            usia: 7,
            sekolah: 'SD Negeri 1',
            kelas: '1',
            rt: '01',
            status: 'Aktif'
        }
    ];

    saveData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('datasosialmasyarakat', JSON.stringify(dataStore));
}

// ============================================
// TEMPAT IBADAH FUNCTIONS
// ============================================

function addTempatIbadah(data) {
    const id = dataStore.tempatIbadah.length > 0 
        ? Math.max(...dataStore.tempatIbadah.map(x => x.id)) + 1 
        : 1;
    
    const newData = {
        id,
        namaTempat: data.namaTempat,
        jenis: data.jenis,
        pengurus: data.pengurus,
        noHpPengurus: data.noHpPengurus,
        alamat: data.alamat,
        koordinat: data.koordinat,
        status: data.status || 'Aktif'
    };
    
    dataStore.tempatIbadah.push(newData);
    saveData();
    return newData;
}

function updateTempatIbadah(id, data) {
    const index = dataStore.tempatIbadah.findIndex(x => x.id == id);
    if (index !== -1) {
        dataStore.tempatIbadah[index] = { id, ...data };
        saveData();
        return dataStore.tempatIbadah[index];
    }
    return null;
}

function deleteTempatIbadah(id) {
    dataStore.tempatIbadah = dataStore.tempatIbadah.filter(x => x.id != id);
    saveData();
}

function searchTempatIbadah(query) {
    const q = query.toLowerCase();
    return dataStore.tempatIbadah.filter(x => 
        x.namaTempat.toLowerCase().includes(q) ||
        x.jenis.toLowerCase().includes(q) ||
        x.pengurus.toLowerCase().includes(q) ||
        x.alamat.toLowerCase().includes(q)
    );
}

// ============================================
// PENERIMA BANTUAN FUNCTIONS
// ============================================

function addPenerimaBantuan(data) {
    const id = dataStore.penerimaBantuan.length > 0 
        ? Math.max(...dataStore.penerimaBantuan.map(x => x.id)) + 1 
        : 1;
    
    // Check if NIK already exists and get nama
    let nama = data.nama;
    const existingNIK = dataStore.penerimaBantuan.find(x => x.nik === data.nik);
    if (existingNIK) {
        nama = existingNIK.nama;
    }
    
    // Check if same NIK already has 2 entries
    const nikCount = dataStore.penerimaBantuan.filter(x => x.nik === data.nik).length;
    if (nikCount >= 2) {
        throw new Error('1 NIK hanya bisa menerima bantuan maksimal 2 kali');
    }
    
    const newData = {
        id,
        nik: data.nik,
        nama: nama,
        jenisBantuan: data.jenisBantuan,
        tanggal: data.tanggal,
        jumlah: 1,
        status: data.status || 'Aktif'
    };
    
    dataStore.penerimaBantuan.push(newData);
    saveData();
    return newData;
}

function updatePenerimaBantuan(id, data) {
    const index = dataStore.penerimaBantuan.findIndex(x => x.id == id);
    if (index !== -1) {
        dataStore.penerimaBantuan[index] = { 
            ...dataStore.penerimaBantuan[index],
            ...data,
            id
        };
        saveData();
        return dataStore.penerimaBantuan[index];
    }
    return null;
}

function deletePenerimaBantuan(id) {
    dataStore.penerimaBantuan = dataStore.penerimaBantuan.filter(x => x.id != id);
    saveData();
}

function searchPenerimaBantuan(query) {
    const q = query.toLowerCase();
    return dataStore.penerimaBantuan.filter(x => 
        x.nik.toLowerCase().includes(q) ||
        x.nama.toLowerCase().includes(q) ||
        x.jenisBantuan.toLowerCase().includes(q)
    );
}

function getNamaByNIK(nik) {
    const data = dataStore.penerimaBantuan.find(x => x.nik === nik);
    return data ? data.nama : '';
}

// ============================================
// DASAWISMA FUNCTIONS
// ============================================

function addDasawisma(data) {
    const id = dataStore.dasawisma.length > 0 
        ? Math.max(...dataStore.dasawisma.map(x => x.id)) + 1 
        : 1;
    
    const newData = {
        id,
        namaDasawisma: data.namaDasawisma,
        alamat: data.alamat,
        rt: data.rt,
        ketua: data.ketua,
        noHpKetua: data.noHpKetua,
        sekretaris: data.sekretaris,
        bendahara: data.bendahara,
        jumlahAnggota: Math.min(parseInt(data.jumlahAnggota) || 0, 17),
        status: data.status || 'Aktif'
    };
    
    dataStore.dasawisma.push(newData);
    saveData();
    return newData;
}

function updateDasawisma(id, data) {
    const index = dataStore.dasawisma.findIndex(x => x.id == id);
    if (index !== -1) {
        dataStore.dasawisma[index] = { 
            ...dataStore.dasawisma[index],
            ...data,
            jumlahAnggota: Math.min(parseInt(data.jumlahAnggota) || 0, 17),
            id
        };
        saveData();
        return dataStore.dasawisma[index];
    }
    return null;
}

function deleteDasawisma(id) {
    dataStore.dasawisma = dataStore.dasawisma.filter(x => x.id != id);
    saveData();
}

function searchDasawisma(query) {
    const q = query.toLowerCase();
    return dataStore.dasawisma.filter(x => 
        x.namaDasawisma.toLowerCase().includes(q) ||
        x.rt.toLowerCase().includes(q) ||
        x.ketua.toLowerCase().includes(q) ||
        x.alamat.toLowerCase().includes(q)
    );
}

// ============================================
// POSYANDU FUNCTIONS
// ============================================

function addPosyandu(data) {
    const id = dataStore.posyandu.length > 0 
        ? Math.max(...dataStore.posyandu.map(x => x.id)) + 1 
        : 1;
    
    const newData = {
        id,
        namaPosyandu: data.namaPosyandu,
        ketua: data.ketua,
        noHp: data.noHp,
        balita: parseInt(data.balita) || 0,
        lansia: parseInt(data.lansia) || 0,
        status: data.status || 'Aktif'
    };
    
    dataStore.posyandu.push(newData);
    saveData();
    return newData;
}

function updatePosyandu(id, data) {
    const index = dataStore.posyandu.findIndex(x => x.id == id);
    if (index !== -1) {
        dataStore.posyandu[index] = { 
            ...dataStore.posyandu[index],
            ...data,
            balita: parseInt(data.balita) || 0,
            lansia: parseInt(data.lansia) || 0,
            id
        };
        saveData();
        return dataStore.posyandu[index];
    }
    return null;
}

function deletePosyandu(id) {
    dataStore.posyandu = dataStore.posyandu.filter(x => x.id != id);
    saveData();
}

function searchPosyandu(query) {
    const q = query.toLowerCase();
    return dataStore.posyandu.filter(x => 
        x.namaPosyandu.toLowerCase().includes(q) ||
        x.ketua.toLowerCase().includes(q)
    );
}

// ============================================
// RT FUNCTIONS
// ============================================

function addRT(data) {
    const id = dataStore.rt.length > 0 
        ? Math.max(...dataStore.rt.map(x => x.id)) + 1 
        : 1;
    
    const newData = {
        id,
        noRT: data.noRT,
        ketua: data.ketua,
        noHp: data.noHp,
        jumlahKK: parseInt(data.jumlahKK) || 0,
        lakilaki: parseInt(data.lakilaki) || 0,
        perempuan: parseInt(data.perempuan) || 0,
        alamat: data.alamat,
        status: data.status || 'Aktif'
    };
    
    dataStore.rt.push(newData);
    saveData();
    return newData;
}

function updateRT(id, data) {
    const index = dataStore.rt.findIndex(x => x.id == id);
    if (index !== -1) {
        dataStore.rt[index] = { 
            ...dataStore.rt[index],
            ...data,
            jumlahKK: parseInt(data.jumlahKK) || 0,
            lakilaki: parseInt(data.lakilaki) || 0,
            perempuan: parseInt(data.perempuan) || 0,
            id
        };
        saveData();
        return dataStore.rt[index];
    }
    return null;
}

function deleteRT(id) {
    dataStore.rt = dataStore.rt.filter(x => x.id != id);
    saveData();
}

function searchRT(query) {
    const q = query.toLowerCase();
    return dataStore.rt.filter(x => 
        x.noRT.toLowerCase().includes(q) ||
        x.ketua.toLowerCase().includes(q) ||
        x.alamat.toLowerCase().includes(q)
    );
}

// ============================================
// USIA ANAK SEKOLAH FUNCTIONS
// ============================================

function addUsiaAnak(data) {
    const id = dataStore.usiaAnak.length > 0 
        ? Math.max(...dataStore.usiaAnak.map(x => x.id)) + 1 
        : 1;
    
    const newData = {
        id,
        nama: data.nama,
        usia: parseInt(data.usia) || 0,
        sekolah: data.sekolah,
        kelas: data.kelas,
        rt: data.rt,
        status: data.status || 'Aktif'
    };
    
    dataStore.usiaAnak.push(newData);
    saveData();
    return newData;
}

function updateUsiaAnak(id, data) {
    const index = dataStore.usiaAnak.findIndex(x => x.id == id);
    if (index !== -1) {
        dataStore.usiaAnak[index] = { 
            ...dataStore.usiaAnak[index],
            ...data,
            usia: parseInt(data.usia) || 0,
            id
        };
        saveData();
        return dataStore.usiaAnak[index];
    }
    return null;
}

function deleteUsiaAnak(id) {
    dataStore.usiaAnak = dataStore.usiaAnak.filter(x => x.id != id);
    saveData();
}

function searchUsiaAnak(query) {
    const q = query.toLowerCase();
    return dataStore.usiaAnak.filter(x => 
        x.nama.toLowerCase().includes(q) ||
        x.sekolah.toLowerCase().includes(q) ||
        x.rt.toLowerCase().includes(q)
    );
}

// ============================================
// STATISTICS FUNCTIONS
// ============================================

function getStatistics() {
    return {
        tempatIbadah: dataStore.tempatIbadah.length,
        penerimaBantuan: dataStore.penerimaBantuan.length,
        dasawisma: dataStore.dasawisma.length,
        posyandu: dataStore.posyandu.length,
        rt: dataStore.rt.length,
        usiaAnak: dataStore.usiaAnak.length
    };
}

function getJenisIbadahDistribution() {
    const distribution = {};
    dataStore.tempatIbadah.forEach(item => {
        distribution[item.jenis] = (distribution[item.jenis] || 0) + 1;
    });
    return distribution;
}

function getJenisBantuanDistribution() {
    const distribution = {};
    dataStore.penerimaBantuan.forEach(item => {
        distribution[item.jenisBantuan] = (distribution[item.jenisBantuan] || 0) + 1;
    });
    return distribution;
}

function getStatusRTDistribution() {
    let aktif = 0, tidakAktif = 0;
    dataStore.rt.forEach(item => {
        if (item.status === 'Aktif') aktif++;
        else tidakAktif++;
    });
    return { Aktif: aktif, 'Tidak Aktif': tidakAktif };
}

function getBalitaLansiaStats() {
    let totalBalita = 0, totalLansia = 0;
    dataStore.posyandu.forEach(item => {
        totalBalita += item.balita;
        totalLansia += item.lansia;
    });
    return { Balita: totalBalita, Lansia: totalLansia };
}

// Initialize on load
initializeData();
