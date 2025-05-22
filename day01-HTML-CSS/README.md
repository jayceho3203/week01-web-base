# Jayce Restaurant Website

A modern restaurant website with a responsive design and dynamic menu management.

## Features

- Responsive design for all devices
- Dynamic menu management
- Modern UI with animations
- RESTful API backend
- Form validation
- Real-time updates

## Project Structure

```
day01-HTML-CSS/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── css/
│   └── style.css
├── js/
│   └── script.js
└── index.html
```

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   python app.py
   ```
   The server will run on http://localhost:8000

2. Open `index.html` in your browser or use a local server:
   ```bash
   python -m http.server 3000
   ```
   Then visit http://localhost:3000

## API Endpoints

- `GET /menu` - Get all menu items
- `POST /menu` - Add a new menu item
- `PUT /menu/{item_id}` - Update a menu item
- `DELETE /menu/{item_id}` - Delete a menu item

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- FastAPI
- Python 3.8+

## Tổng quan
Dự án Jayce Restaurant là một landing page hiện đại cho nhà hàng ẩm thực Á-Âu, kết hợp với trang quản trị (admin) để quản lý món ăn, đơn hàng và người dùng.

## Cấu trúc dự án
- **Thư mục chính:** `day01-HTML-CSS/`
- **Các file chính:**
  - `index.html`: Trang chủ landing page
  - `admin.html`: Trang quản trị
  - `css/style.css`: CSS chung
  - `css/admin.css`: CSS cho trang quản trị
  - `js/admin.js`: Logic JavaScript cho trang quản trị
  - `assets/`: Thư mục chứa hình ảnh, logo, v.v.

## Tính năng
### Landing Page
- **Header:** Logo, menu điều hướng, nút đăng nhập/đăng ký
- **Hero:** Ảnh nền lớn, slogan, nút CTA
- **Featured Dishes:** Hiển thị các món ăn nổi bật
- **Menu:** Danh sách món ăn theo danh mục
- **Why Us:** Lý do chọn nhà hàng
- **Footer:** Thông tin liên hệ, social media

### Trang Quản Trị (Admin)
- **Đăng nhập:** Form đăng nhập cho admin
- **Dashboard:** Giao diện quản trị với sidebar và header
- **Quản lý món ăn:** Thêm, sửa, xóa món ăn
- **Quản lý đơn hàng:** Xem danh sách đơn hàng, chi tiết đơn

## Công nghệ sử dụng
- **HTML5:** Cấu trúc trang
- **CSS3:** Giao diện, responsive
- **JavaScript:** Logic tương tác, kết nối database (Supabase)
- **Supabase:** Database và authentication

## Cách sử dụng
1. **Clone dự án:**
   ```bash
   git clone <repository-url>
   cd day01-HTML-CSS
   ```

2. **Mở trang chủ:**
   - Mở file `index.html` trong trình duyệt

3. **Truy cập trang quản trị:**
   - Mở file `admin.html`
   - Đăng nhập với tài khoản admin

4. **Quản lý dữ liệu:**
   - Thêm/sửa/xóa món ăn
   - Xem danh sách đơn hàng


## Lưu ý
- Cần cấu hình Supabase URL và API Key trong file `js/admin.js` hoặc sử dụng biến môi trường.
- Đảm bảo các file CSS và JS được liên kết đúng trong HTML.
- Thêm, sửa xoá trên trang admin cũng sẽ thêm, sửa, xoá trên database và ngược lại.
## Tác giả
Jayce Restaurant Team

