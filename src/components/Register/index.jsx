import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { uuid } from "../../utils";
import './style.scss';
import { BACKEND_DOMAIN_API } from "../../global";

const validation = Yup.object({
    email: Yup.string()
        .email('Bạn cần nhập đúng định dạng email!')
        .required('Bạn cần cung cấp email!'),
    password: Yup.string().required('Bạn cần nhập mật khẩu!'),
    username: Yup.string().required('Bạn cần họ tên!'),
    dob: Yup.date(),
})
const Register = () => {
    const navigate = useNavigate();
    const { values, touched, isValid, errors, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            id: uuid(),
            email: '',
            password: '',
            username: '',
            date: '',
            role: 'CUSTOMER'
        },
        validationSchema: validation,
        onSubmit(values) {
          
            handleRegister(values);
        }
    });
     const handleRegister = async (user) => {
        const listPrevUser = await axios.get(`${BACKEND_DOMAIN_API}/api/v1/users`);
        const arrUser = listPrevUser.data;
        // const requiredRegister = await axios.post(`${BACKEND_DOMAIN_API}/api/v1/users` ,user);
        // console.log(requiredRegister)
        const findExistUser = arrUser.findIndex((item) => item.email === user.email);
        if (findExistUser >= 0) {
            alert('email ton tai');
        }else {
            const requiredRegister =  await axios.post(`${BACKEND_DOMAIN_API}/api/v1/users` ,user);
            if (requiredRegister.status === 201){
                alert('dang ky thanh cong');
                navigate('/auth/Login');
            }
        }
     }
    return (
        <div className="container-register-page">
            <h1>Đăng ký tài khoản shop mindX</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label>username <strong className="red">*</strong></label>
                    <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                </div>
                {touched.username && !isValid && errors.username && <p className="red">{errors.username}</p>}   
                <div className="row">
                    <label>Email <strong className="red">*</strong></label>
                    <input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                </div>
                {touched.email && !isValid && errors.email && <p className="red">{errors.email}</p>}
                <div className="row">
                    <label>Password <strong className="red">*</strong></label>
                    <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                </div>
                {touched.password && !isValid && errors.password && <p className="red">{errors.password}</p>}
                <button type="submit">Đăng ký</button>
                <input type="button" value='Đăng nhập' onClick={() => {
                     navigate('/auth/Login');
                }} />
            </form>
        </div>
    )
}
export default Register;