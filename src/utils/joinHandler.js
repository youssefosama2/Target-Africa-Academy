import Swal from "sweetalert2";
import i18next from "i18next"; // استيراد المكتبة مباشرة

export const handleJoin = (data = {}) => {
  const {
    plan = i18next.language === 'ar' ? "غير محدد" : "Not Specified",
    type = "join"
  } = data;

  const isAr = i18next.language === 'ar';

  Swal.fire({
    title: type === "trial" ? i18next.t("join.trial_title") : i18next.t("join.join_title"),
    
    // إضافة كلاس لضبط الاتجاه بناءً على اللغة
    customClass: {
      popup: isAr ? 'swal2-rtl' : ''
    },

    html: `
      <input type="text" id="swal-name" class="swal2-input" placeholder="${i18next.t("join.name_placeholder")}">
      <input type="number" id="swal-age" class="swal2-input" placeholder="${i18next.t("join.age_placeholder")}">
      <input type="tel" id="swal-phone" class="swal2-input" placeholder="${i18next.t("join.phone_placeholder")}">
    `,

    confirmButtonText: i18next.t("join.send"),
    focusConfirm: false,

    preConfirm: () => {
      const name = document.getElementById("swal-name").value.trim();
      const age = document.getElementById("swal-age").value.trim();
      const phone = document.getElementById("swal-phone").value.trim();

      if (!name || !age || !phone) {
        Swal.showValidationMessage(i18next.t("join.error_msg"));
        return false;
      }

      return { name, age, phone };
    }
  }).then((result) => {
    if (!result.isConfirmed) return;

    const { name, age, phone } = result.value;
    const academyPhone = "201091654379";

    // رسالة الواتساب المترجمة
    const message =
      `${i18next.t("join.wa_request")}%0A%0A` +
      `* ${i18next.t("join.wa_name")}:* ${name}%0A` +
      `* ${i18next.t("join.wa_age")}:* ${age}%0A` +
      `* ${i18next.t("join.wa_phone")}:* ${phone}%0A` +
      `* ${i18next.t("join.wa_plan")}:* ${plan}%0A%0A`;

    window.open(
      `https://wa.me/${academyPhone}?text=${message}`,
      "_blank"
    );
  });
};