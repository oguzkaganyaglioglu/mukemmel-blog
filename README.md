# Merhaba
Bu blog [Selman Kahya'nın "Mükemmel Blog" yarışması](https://www.youtube.com/watch?v=cHUh0FmPd3A) için kodlanmıştır 
Kodladığım bloğun web sitesine [buradan](https://perfectwithme.herokuapp.com/) ulaşabilirsiniz: [https://perfectwithme.herokuapp.com/](https://perfectwithme.herokuapp.com/)

# Özellikleri

#### Admin paneli
- Üye banlama
- Üyeye adminlik verme ve alma 
- Üye silme
- Üyeyi silmek üzere işaretleme
- Post oluşturma
- Postu taslağa kaydetme
- Postu düzenleme
### Diğer
- Üye Olma
- Üye Girişi
- Şifremi Unuttum
- Mobil uyumlu tasarım
- Yorum bırakabilme
- Bırakılan yorumu  bırakan kullanıcı tarafından;
- - düzenleme
- - silme
- Bırakılan yorumu admin tarafından;
- - silme
- - banlama
- - düzenleme
- Google Analytic bağlantısı
- Environment variable kullanıldı
- Veri tabanı entegrasyonu
- Slug düzeltme
- Blog gönderisi arama
- Ve daha fazlası ...
# ENV değişkenleri
| Env Değişkeni | Değeri | |
|--|--|--|
| API_VERSION | v1 |
| DOMAIN | Sitenin domain adresi|
| JWT_SECRET | Tokeniniz için anahtar |
| MONGO_URL | Mongo DB url niz| mongodb+srv://dbUser:dbPass@****.mongodb.net/... |
| NODE_ENV | production|
| PASS_SECRET | Şifreleri şifreleme için anahtar |
| PORT | web sitenizin portu | genelde 80 olur|
| SESSION_SECRET | Session için anahtar |
| GOOGLE_TRACKING_ID | UA-*** | Google analytic için ID|
| SMTP_PASS | Mail gönderimi için şifre | Eğer google kullanacaksanız hesap şifrenizdir eğer iki adımlı doğrulama kullanıyorsanız uygulama şifresi almalısınız|
| SMTP_HOST | Mail gönderim servisi | Eğer google kullanacaksanız " smtp.gmail.com " |
| SMTP_PORT | Mail gönderim servisi portu | Google için TLS/SSL => 587/465 ikisinden birini girmelisiniz|
| SMTP_USER | Mail servisi kullanıcı adı | Google için mail adresinizdir|
| SMTP_FROM | Mailin hangi adresten gönderileceği | Google için mail adresinizdir

# Admin Paneli Resimleri

![Admin Panel üyeler sekmesi](https://i.hizliresim.com/3OXNE4.png)

![Admin Panel yeni gönderi oluşturma sekmesi](https://i.hizliresim.com/gPNn62.png)

![Admin Panel gönderi işlemleri sekmesi](https://i.hizliresim.com/WXl4q2.png)

![Admin Panel taslak post sekmesi](https://i.hizliresim.com/yGym6y.png)

