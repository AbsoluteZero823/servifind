import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar" className='sidenav'>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/"><i className="fa fa-tachometer-alt" aria-hidden="true"></i> Dashboard</Link>
                    </li>

                    {/* <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li> */}

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    {/* <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li> */}
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="fa fa-users"></i> Users</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/users"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
                            <li>
                                <Link to="/freelancers"><i className="fa fa-briefcase"></i> Freelancers</Link>
                            </li>

                            <li>
                                <Link to="/create"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/services"><i className="fa fa-cogs"></i>Services</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders"><i className="fa fa-history"></i>Transactions</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-flag"></i> Reports</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar