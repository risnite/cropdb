// validation
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    // checkbox validation
    const checkboxValidation = (checked, checkboxes) => {
      if (checked) {
        // console.log(checked);
        Array.from(checkboxes).forEach((checkbox) => {
          checkbox.required = false
        })
      } else {
        Array.from(checkboxes).forEach((checkbox) => {
          checkbox.required = true
        })
      }
    }

    const produkChecked = document.querySelectorAll(".produk-checkbox:checked").length;
    const produkCheckboxes = document.querySelectorAll(".produk-checkbox");
    checkboxValidation(produkChecked, produkCheckboxes);

    const komoditasChecked = document.querySelectorAll(".komoditas-checkbox:checked").length;
    const komoditasCheckboxes = document.querySelectorAll(".komoditas-checkbox");
    checkboxValidation(komoditasChecked, komoditasCheckboxes);

    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')

  }, false)
});
// // end of validation

// save data during refresh page
// window.onbeforeunload = function () {
//   var produkCheckboxes = [];
//   $("input[type=checkbox][name=produk]:checked").each((i, e) => {
//     produkCheckboxes.push(e.value);
//   });
//   sessionStorage.setItem("produk", produkCheckboxes);
//   sessionStorage.setItem("namaLengkap", $('#namaLengkap').val());
//   sessionStorage.setItem("namaPanggilan", $('#namaPanggilan').val());
//   sessionStorage.setItem("handphone", $('#handphone').val());
//   sessionStorage.setItem("handphoneWa", $('.handphone-radio:checked').val());
//   sessionStorage.setItem("pembudidaya", $("input[type=radio][name=pembudidaya]:checked").val());
//   sessionStorage.setItem("email", $('#email').val());

//   // ...
// }
// get data after refresh
// window.onload = function () {

//   var produk = sessionStorage.getItem("produk");
//   if (produk !== null) {
//     $("input[type=checkbox][name=produk]").each((i, e) => {
//       if (produk.includes(e.value)) {
//         e.checked = true;
//       }
//     })
//   }
//   var namaLengkap = sessionStorage.getItem("namaLengkap");
//   if (namaLengkap !== null) {
//     $('#namaLengkap').val(namaLengkap);
//   }
//   var namaPanggilan = sessionStorage.getItem("namaPanggilan");
//   if (namaPanggilan !== null) {
//     $('#namaPanggilan').val(namaPanggilan);
//   }
//   var pembudidaya = sessionStorage.getItem("pembudidaya");
//   if (pembudidaya !== null) {
//     $("input[type=radio][name=pembudidaya]").each((i, e) => {
//       if (pembudidaya == e.value) {
//         e.checked = true;
//       }
//     });
//   }
//   var handphone = sessionStorage.getItem("handphone");
//   if (handphone !== null) {
//     $('#handphone').val(handphone);
//   }
//   var handphoneWa = sessionStorage.getItem("handphoneWa");
//   if (handphoneWa !== null) {
//     $(".handphone-radio").each((i, e) => {
//       if (handphoneWa == e.value) {
//         e.checked = true
//       }
//     })
//   }
//   var email = sessionStorage.getItem("email");
//   if (email != null) {
//     $("#email").val(email)
//   }
// }
$(document).ready(function () {
  $('form').submit(() => {
    $('select').prop('disabled', false);
    $('input').prop('disabled', false);
  })
  $(document).on('select2:open', () => {
    document.querySelector('.select2-search__field').focus();
  });

  $("select").select2({
    theme: 'bootstrap4',
    placeholder: 'Select...'
  });

  function ajaxCall(route, element, kode) {
    $.ajax({
      type: "POST",
      url: `/api/wilayah/${route}`,
      data: {
        kode: kode
      },
      dataType: "json",
      success: function (results) {
        // console.log(results);
        $(element).append(`<option value="">Select..</option>`);
        results.forEach(result => {
          $(element).append(`<option label="${result.kode}" value="${result.nama}">${result.nama}</option>`);
        });
        $(element).prop('disabled', false);
      }
    });
  }

  function changeDomisiliKtp() {
    if ($('#domisili-ktp-true').is(':checked')) {
      $("#alamat-ktp").val($("#alamat").val()).change();
      $("#provinsi-ktp").val($("#provinsi").val()).change();
      $("#kota-ktp").html($("#kota").find(":selected").clone());
      $("#kecamatan-ktp").html($("#kecamatan").find(":selected").clone())
      $("#kelurahan-ktp").html($("#kelurahan").find(":selected").clone())
      $("#kode-pos-ktp").val($("#kode-pos").val())
    }
  }

  // get kota
  $("#provinsi").change(function () {
    $("#kota").html('');
    $("#kecamatan").html('');
    $("#kecamatan").prop('disabled', true);
    $("#kelurahan").html('');
    $("#kelurahan").prop('disabled', true);
    var kode = $(this).find('option:selected').prop('label');
    // console.log('kode provinsi:');
    // console.log(kode);
    ajaxCall('kota', '#kota', kode);
    // change domisili-ktp if true
    changeDomisiliKtp();
  });
  // get kecamatan
  $("#kota").change(function () {
    $("#kecamatan").html('');
    $("#kelurahan").html('');
    $("#kelurahan").prop('disabled', true);
    var kode = $(this).find('option:selected').prop('label');
    ajaxCall('kecamatan', '#kecamatan', kode);
    // change domisili-ktp if true
    changeDomisiliKtp();
  });
  // get kelurahan
  $("#kecamatan").change(function () {
    $("#kelurahan").html('');
    var kode = $(this).find('option:selected').prop('label');
    ajaxCall('kelurahan', '#kelurahan', kode);
    // change domisili-ktp if true
    changeDomisiliKtp();
  });
  $("#kelurahan").change(function () {
    // change domisili-ktp if true
    changeDomisiliKtp();
  });
  $("#kode-pos").change(() => {
    // console.log($(this));
    changeDomisiliKtp();
  })

  // domisili-ktp
  // get kota
  $("#provinsi-ktp").change(function () {
    if (!$("#provinsi-ktp").prop('disabled')) {
      $("#kota-ktp").html('');
      $("#kecamatan-ktp").html('');
      $("#kecamatan-ktp").prop('disabled', true);
      $("#kelurahan-ktp").html('');
      $("#kelurahan-ktp").prop('disabled', true);
      var kode = $(this).find('option:selected').prop('label');
      // console.log(kode);
      ajaxCall('kota', '#kota-ktp', kode);
    }
  });

  // get kecamatan
  $("#kota-ktp").change(function () {
    $("#kecamatan-ktp").html('');
    $("#kelurahan-ktp").html('');
    $("#kelurahan-ktp").prop('disabled', true);
    var kode = $(this).find('option:selected').prop('label');
    ajaxCall('kecamatan', '#kecamatan-ktp', kode);
  });
  // get kelurahan
  $("#kecamatan-ktp").change(function () {
    $("#kelurahan-ktp").html('');
    var kode = $(this).find('option:selected').prop('label');
    ajaxCall('kelurahan', '#kelurahan-ktp', kode);
  });

  // check if domisili = ktp
  $("#domisili-ktp-true").click(function () {
    // console.log(this.value);
    // console.log($("#provinsi").val());
    // console.log($("#provinsi-ktp").val());
    $("#alamat-ktp").prop("disabled", true);
    $("#provinsi-ktp").prop("disabled", true);
    $("#kota-ktp").prop("disabled", true);
    $("#kecamatan-ktp").prop("disabled", true);
    $("#kelurahan-ktp").prop("disabled", true);
    $("#kode-pos-ktp").prop("disabled", true);
    changeDomisiliKtp();
  });
  $("#domisili-ktp-false").click(function () {
    // console.log(this.value);
    $("#alamat-ktp").val("").change();
    $("#alamat-ktp").prop("disabled", false);
    $("#provinsi-ktp").val("").change();
    $("#provinsi-ktp").prop("disabled", false);
    $("#kota-ktp").html('');
    $("#kecamatan-ktp").html('');
    $("#kelurahan-ktp").html('');
    $('#kode-pos-ktp').val('');
    $('#kode-pos-ktp').prop("disabled", false);
  });
});