import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>

      <div className="dlabnav border-right">
        <div className="dlabnav-scroll">
          <p className="menu-title style-1"> Main Menu</p>
          <ul className="metismenu" id="menu">
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-grid" />
              <span className="nav-text">Dashboard</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="index.html">Dashboard Light</a></li>
                <li><a href="index-2.html">Dashboard Dark</a></li>
                <li><a href="food-order.html">Food Order</a></li>
                <li><a href="favorite-menu.html">Favorite Menu</a></li>
                <li><a href="message.html">Message</a></li>
                <li><a href="order-history.html">Order History</a></li>
                <li><a href="notification.html">Notification</a></li>
                <li><a href="bill.html">Bill</a></li>
                <li><a href="setting.html">Setting</a></li>
              </ul>
            </li>

            <li>
              <a className="has-arrow" href="javascript:void(0);" aria-expanded="false">
                <i className="bi bi-archive" />
                <span className="nav-text">Orders</span>
              </a>
              <ul aria-expanded="false">
                <li><Link to={`/order/create`}>Create Order</Link></li>
                <li><Link to={`/order`}>Order List</Link></li>
                {/* <li><a href="<?= $base_url ?>/orderdetail">Order Detail</a></li>
                <li><a href="order-tracking.html">Order Tracking</a></li> */}
              </ul>
            </li>



            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-shop-window" />
              <span className="nav-text">Restaurant</span>
            </a>
              <ul aria-expanded="false">
                <li><Link to={`/restaurant`}>Restaurant List</Link></li>
                <li><Link to={`/menuitem`}>Menu</Link></li>
                {/* <li><a href="orders.html">Orders</a></li>
                <li><a href="customer-reviews.html">Reviews</a></li>
                <li><a href="restro-setting.html">Setting</a></li> */}
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-bicycle" />
              <span className="nav-text">Riders</span>
            </a>
              <ul aria-expanded="false">
                <li><Link to={`/rider`}>Rider List</Link></li>
                {/* <li><a href="deliver-order.html">Orders</a></li>
                <li><a href="feedback.html">Feedback</a></li> */}
              </ul>
            </li>


            <li>
              <a className="has-arrow" href="javascript:void(0);" aria-expanded="false">
                <i className="bi bi-people-fill" /> {/* Remix icon */}
                <span className="nav-text">Customer</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to={`/customer`}>Customer List</Link>
                </li>
              </ul>
            </li>

            <li>
              <a className="has-arrow" href="javascript:void(0);" aria-expanded="false">
                <i className="bi bi-basket2" />
                <span className="nav-text">Menu Items</span>
              </a>
              <ul aria-expanded="false">
                <li><Link to={`/menuitem`}>Food List</Link></li>
                <li><Link to={`/menuitem/create`}>Create Food</Link></li>
               
              </ul>
            </li>

            <li>
              <a className="has-arrow" href="javascript:void(0);" aria-expanded="false">
                <i className="bi bi-person-lines-fill" /> {/* Proper icon for Users */}
                <span className="nav-text">Users</span>
              </a>
              <ul aria-expanded="false">
                <li><Link to={`/user`}>All Users</Link></li>
                <li><Link to={`/user/create`}>Add New User</Link></li>
              </ul>
            </li>










            <li className="menu-title">Other</li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-info-circle" />
              <span className="nav-text">Apps</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="app-profile.html">Profile</a></li>
                <li><a href="post-details.html">Post Details</a></li>
                <li><a className="has-arrow" href="javascript:void(0);" aria-expanded="false">Email</a>
                  <ul aria-expanded="false">
                    <li><a href="email-compose.html">Compose</a></li>
                    <li><a href="email-inbox.html">Inbox</a></li>
                    <li><a href="email-read.html">Read</a></li>
                  </ul>
                </li>
                <li><a href="app-calender.html">Calendar</a></li>
                <li><a className="has-arrow" href="javascript:void(0);" aria-expanded="false">Shop</a>
                  <ul aria-expanded="false">
                    <li><a href="ecom-product-grid.html">Product Grid</a></li>
                    <li><a href="ecom-product-list.html">Product List</a></li>
                    <li><a href="ecom-product-detail.html">Product Details</a></li>
                    <li><a href="ecom-product-order.html">Order</a></li>
                    <li><a href="ecom-checkout.html">Checkout</a></li>
                    <li><a href="ecom-invoice.html">Invoice</a></li>
                    <li><a href="ecom-customers.html">Customers</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-pie-chart" />
              <span className="nav-text">Charts</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="chart-flot.html">Flot</a></li>
                <li><a href="chart-morris.html">Morris</a></li>
                <li><a href="chart-chartjs.html">Chartjs</a></li>
                <li><a href="chart-chartist.html">Chartist</a></li>
                <li><a href="chart-sparkline.html">Sparkline</a></li>
                <li><a href="chart-peity.html">Peity</a></li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-star" />
              <span className="nav-text">Bootstrap</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="ui-accordion.html">Accordion</a></li>
                <li><a href="ui-alert.html">Alert</a></li>
                <li><a href="ui-badge.html">Badge</a></li>
                <li><a href="ui-button.html">Button</a></li>
                <li><a href="ui-modal.html">Modal</a></li>
                <li><a href="ui-button-group.html">Button Group</a></li>
                <li><a href="ui-list-group.html">List Group</a></li>
                <li><a href="ui-card.html">Cards</a></li>
                <li><a href="ui-carousel.html">Carousel</a></li>
                <li><a href="ui-dropdown.html">Dropdown</a></li>
                <li><a href="ui-popover.html">Popover</a></li>
                <li><a href="ui-progressbar.html">Progressbar</a></li>
                <li><a href="ui-tab.html">Tab</a></li>
                <li><a href="ui-typography.html">Typography</a></li>
                <li><a href="ui-pagination.html">Pagination</a></li>
                <li><a href="ui-grid.html">Grid</a></li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-heart" />
              <span className="nav-text">Plugins</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="uc-select2.html">Select 2</a></li>
                <li><a href="uc-nestable.html">Nestedable</a></li>
                <li><a href="uc-noui-slider.html">Noui Slider</a></li>
                <li><a href="uc-sweetalert.html">Sweet Alert</a></li>
                <li><a href="uc-toastr.html">Toastr</a></li>
                <li><a href="map-jqvmap.html">Jqv Map</a></li>
                <li><a href="uc-lightgallery.html">Light Gallery</a></li>
              </ul>
            </li>
            <li><a href="widget-basic.html" aria-expanded="false">
              <i className="bi bi-gear-wide" />
              <span className="nav-text">Widget</span>
            </a>
            </li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-file-earmark-check" />
              <span className="nav-text">Forms</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="form-element.html">Form Elements</a></li>
                <li><a href="form-wizard.html">Wizard</a></li>
                <li><a href="form-ckeditor.html">CkEditor</a></li>
                <li><a href="form-pickers.html">Pickers</a></li>
                <li><a href="form-validation.html">Form Validate</a></li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-file-earmark-spreadsheet" />
              <span className="nav-text">Table</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="table-bootstrap-basic.html">Bootstrap</a></li>
                <li><a href="table-datatable-basic.html">Datatable</a></li>
              </ul>
            </li>
            <li><a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <i className="bi bi-file-earmark-break" />
              <span className="nav-text">Pages</span>
            </a>
              <ul aria-expanded="false">
                <li><a href="page-login.html">Login</a></li>
                <li><a href="page-register.html">Register</a></li>
                <li><a className="has-arrow" href="javascript:void(0);" aria-expanded="false">Error</a>
                  <ul aria-expanded="false">
                    <li><a href="page-error-400.html">Error 400</a></li>
                    <li><a href="page-error-403.html">Error 403</a></li>
                    <li><a href="page-error-404.html">Error 404</a></li>
                    <li><a href="page-error-500.html">Error 500</a></li>
                    <li><a href="page-error-503.html">Error 503</a></li>
                  </ul>
                </li>
                <li><a href="page-lock-screen.html">Lock Screen</a></li>
                <li><a href="empty-page.html">Empty Page</a></li>
              </ul>
            </li>
          </ul>
          <div className="plus-box">
            <div className="d-flex align-items-center">
              <h5>Upgrade your Account to Get Free Voucher</h5>
            </div>
            <a href="javascript:void(0);" className="btn bg-white btn-sm">Upgrade</a>
          </div>
          <div className="copyright mt-0">
            <p><strong>Food Desk - Online Food Delivery Admin Dashboard</strong> © 2022 All Rights Reserved</p>
            <p className="fs-12">Made with <span className="heart" /> by DexignLab</p>
          </div>
        </div>
      </div>





    </>
  )
}

export default Sidebar