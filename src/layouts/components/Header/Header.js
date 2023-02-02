import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Menu from '../LeftSidebar/Menu';
import { MenuItem } from '../LeftSidebar/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompactDisc,
    // faChartSimple,
    // faRadio,
    // faMusic,
    // faIcons,
    // faStar,
    faBars,
} from '@fortawesome/free-solid-svg-icons';

import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);

function Header() {
    const [isDisplay, setIsDisplay] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu-mobile')}>
                <div className={cx('menu-btn')} onClick={() => setIsDisplay(!isDisplay)}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className={cx('menu', isDisplay && 'display')}>
                    <Menu>
                        <MenuItem
                            onClick={() => setIsDisplay(!isDisplay)}
                            icon={<FontAwesomeIcon icon={faCompactDisc} />}
                            title="Khám Phá"
                            to={'/'}
                        />
                    </Menu>
                </div>
            </div>
            <Search />
        </div>
    );
}

export default Header;
