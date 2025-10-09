$(document).ready(function () {

    $('.details-toggle').on('click', function () {
        $(this).closest('tr').next('.app-details').slideToggle(400);
    });

    $('#add-app-form').on('submit', function (event) {
        event.preventDefault();

        let appName = $('#appName').val();
        let companyName = $('#companyName').val();
        let appURL = $('#appURL').val();
        let pricing = $('input[name="pricing"]:checked').val();
        let category = $('#category').val();

        let errors = [];
        let appNameRegex = /^[A-Za-z]+$/;
        let companyNameRegex = /^[A-Za-z0-9]+$/;

        if (!appNameRegex.test(appName)) {
            errors.push("اسم التطبيق يجب أن يكون أحرف إنجليزية فقط بدون فراغات أو أرقام.");
        }
        if (!companyNameRegex.test(companyName)) {
            errors.push("اسم الشركة يجب أن يكون أحرف إنجليزية وأرقام فقط.");
        }

        if (errors.length > 0) {
            $('#error-message').html(errors.join('<br>')).show();
        } else {
            $('#error-message').hide();

            const newApp = {
                name: appName,
                company: companyName,
                url: appURL,
                price: pricing,
                category: category
            };

            localStorage.setItem('newApp', JSON.stringify(newApp));
            window.location.href = 'apps.html';
        }
    });

    if (window.location.pathname.endsWith('apps.html')) {
        const newAppData = localStorage.getItem('newApp');

        if (newAppData) {
            const newApp = JSON.parse(newAppData);

            const newRow = `
                <tr>
                    <td>${newApp.name}</td>
                    <td>${newApp.company}</td>
                    <td>${newApp.category}</td>
                    <td>${newApp.price}</td>
                    <td><input type="checkbox" class="details-toggle"></td>
                </tr>
                <tr class="app-details">
                    <td colspan="5">
                        <div class="details-content">
                            <img src="https://via.placeholder.com/100" alt="شعار ${newApp.name}">
                            <div class="details-text">
                                <h4>${newApp.name}</h4>
                                <p>تفاصيل التطبيق الجديد الذي تمت إضافته.</p>
                                <a href="${newApp.url}" target="_blank">زيارة الموقع</a>
                            </div>
                            <div class="media-placeholder">
                                <p>ملف صوتي/فيديو</p>
                            </div>
                        </div>
                    </td>
                </tr>
            `;

            const newAppRow = $(newRow);
            $('.apps-table tbody').append(newAppRow);

            newAppRow.find('.details-toggle').on('click', function () {
                $(this).closest('tr').next('.app-details').slideToggle(400);
            });

            localStorage.removeItem('newApp');
        }
    }
});