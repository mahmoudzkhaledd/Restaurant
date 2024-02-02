exports.htmlEmailPage = function (user, digits) {
    return `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تفعيل حسابك</title>
        <style>
            *{
                direction:rtl;
            }
            body {
                 font-family: 'Cairo', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
                line-height: 1.6;
            }
    
            a {
                color: #007BFF;
                text-decoration: none;
                font-weight: bold;
            }
    
            .activation-code {
                font-size: 24px;
                font-weight: bold;
                color: #28a745;
                padding: 10px;
                background-color: #f8f9fa;
                border: 1px solid #ced4da;
                border-radius: 5px;
                margin: 20px 0;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div className="container">
            <h2>تفعيل حسابك الجديد</h2>
            <p>مرحبًا ${user},</p>
            <p>شكرًا لاختيارك إنشاء حساب جديد معنا. لإكمال عملية التسجيل، يُرجى إدخال رمز التفعيل المؤلف من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني المسجل.</p>
            
            <div className="activation-code">رمز التفعيل: ${digits}</div>
    
            <p>يرجى اتباع الخطوات التالية:</p>
            <ol>
                <li>انسخ رمز التفعيل المذكور أعلاه.</li>
                <li>قم بتسجيل الدخول إلى حسابك الجديد.</li>
                <li>ادخل رمز التفعيل في الحقل المخصص له.</li>
            </ol>
    
            <p>إذا واجهتك أي مشكلة أو كنت بحاجة إلى مساعدة، يرجى الاتصال بفريق الدعم الفني عبر البريد الإلكتروني <a href="[عنوان البريد الإلكتروني لفريق الدعم]">[عنوان البريد الإلكتروني لفريق الدعم]</a>.</p>
    
            <p>نتمنى لك تجربة ممتعة مع ميديكال.</p>
    
    
        </div>
    </body>
    </html>
    `;
}