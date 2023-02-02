import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './LeftSidebar.module.scss';

import Menu, { MenuItem } from './Menu';
import images from '~/assets';
import mobileLogo from '~/assets/img/mobilelogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '~/App';

const cx = classNames.bind(styles);

function LeftSidebar() {
    const {auth, user, setAuth}= useContext(AppContext)
    const navigate= useNavigate()
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('logo')} to="/">
                <img style={{width: 50}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"} alt="logo" className={cx('logo-img')} />
                <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"} alt="logo" className={cx('logo-img--mobile')} />
            </Link>

            <div className={cx('menu')}>
                <Menu>
                    {
                        auth=== false &&
                        <MenuItem icon={<FontAwesomeIcon icon={faUser} />} title="Đăng nhập" to={'/login'} />
                    }
                    {
                        auth=== true && 
                        <div style={{textAlign: "center", padding: 10, color: "#fff"}}>
                            Xin chào <strong>{user.username} !</strong>
                        </div>
                    }
                    <MenuItem icon={<FontAwesomeIcon icon={faCompactDisc} />} title="Khám Phá" to={'/'} />
                    {/* <MenuItem icon={<FontAwesomeIcon icon={faChartSimple} />} title="Bảng Xếp Hạng" to={'/chart'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faRadio} />} title="Radio" to={'/radio'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faMusic} />} title="Nhạc Mới" to={'/newmusic'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faIcons} />} title="Thể Loại" to={'/category'} />
                    <MenuItem icon={<FontAwesomeIcon icon={faStar} />} title="Top 100" to={'/top100'} /> */}
                    {
                        auth=== true &&
                        <div onClick={()=> {setAuth(false);navigate("/login")}} className={"logout"} style={{textAlign: "center", color: "#fff", height: 44, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", background: "#356fc3"}}>Đăng xuất</div>
                    }
                </Menu>
            </div>
        </div>
    );
}

export default LeftSidebar;
