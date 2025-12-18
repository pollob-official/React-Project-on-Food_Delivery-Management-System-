import React, { use } from 'react'
import Header from './Header'
import Footer from './Footer'
import RoleList from '../pages/roles/RoleList'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'


const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
  {/***********************************
  Main wrapper start
    ************************************/}

    <div id="main-wrapper">
  {/***********************************
      Nav header start
  ************************************/}
  <Header/>
  {/***********************************
      Nav header end
  ************************************/}
  {/***********************************
      Chat box start
  ************************************/}
  <div className="chatbox">
    <div className="chatbox-close" />
    <div className="custom-tab-1">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#notes">Notes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#alerts">Alerts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#chat">Chat</a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade active show" id="chat" role="tabpanel">
          <div className="card mb-sm-3 mb-md-0 contacts_card dlab-chat-user-box">
            <div className="card-header chat-list-header text-center">
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect fill="#000000" x={4} y={11} width={16} height={2} rx={1} /><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x={4} y={11} width={16} height={2} rx={1} /></g></svg></a>
              <div>
                <h6 className="mb-1">Chat List</h6>
                <p className="mb-0">Show All</p>
              </div>
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></a>
            </div>
            <div className="card-body contacts_body p-0 dlab-scroll  " id="DLAB_W_Contacts_Body">
              <ul className="contacts">
                <li className="name-first-letter">A</li>
                <li className="active dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
                      <span>Archie Parker</span>
                      <p>Kalid is online</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Alfie Mason</span>
                      <p>Taherah left 7 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/3.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
                      <span>AharlieKane</span>
                      <p>Sami is online</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/4.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Athan Jacoby</span>
                      <p>Nargis left 30 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="name-first-letter">B</li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/5.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Bashid Samim</span>
                      <p>Rashid left 50 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
                      <span>Breddie Ronan</span>
                      <p>Kalid is online</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Ceorge Carson</span>
                      <p>Taherah left 7 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="name-first-letter">D</li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/3.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
                      <span>Darry Parker</span>
                      <p>Sami is online</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/4.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Denry Hunter</span>
                      <p>Nargis left 30 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="name-first-letter">J</li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/5.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Jack Ronan</span>
                      <p>Rashid left 50 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
                      <span>Jacob Tucker</span>
                      <p>Kalid is online</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>James Logan</span>
                      <p>Taherah left 7 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/3.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
                      <span>Joshua Weston</span>
                      <p>Sami is online</p>
                    </div>
                  </div>
                </li>
                <li className="name-first-letter">O</li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/4.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Oliver Acker</span>
                      <p>Nargis left 30 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="dlab-chat-user">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src="assets/images/avatar/5.jpg" className="rounded-circle user_img"  />
                      <span className="online_icon offline" />
                    </div>
                    <div className="user_info">
                      <span>Oscar Weston</span>
                      <p>Rashid left 50 mins ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card chat dlab-chat-history-box d-none">
            <div className="card-header chat-list-header text-center">
              <a href="javascript:void(0);" className="dlab-chat-history-back">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><polygon points="0 0 24 0 24 24 0 24" /><rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x={14} y={7} width={2} height={10} rx={1} /><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fillRule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) " /></g></svg>
              </a>
              <div>
                <h6 className="mb-1">Chat with Khelesh</h6>
                <p className="mb-0 text-success">Online</p>
              </div>							
              <div className="dropdown">
                <a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2" /> View profile</li>
                  <li className="dropdown-item"><i className="fa fa-users text-primary me-2" /> Add to btn-close friends</li>
                  <li className="dropdown-item"><i className="fa fa-plus text-primary me-2" /> Add to group</li>
                  <li className="dropdown-item"><i className="fa fa-ban text-primary me-2" /> Block</li>
                </ul>
              </div>
            </div>
            <div className="card-body msg_card_body dlab-scroll" id="DLAB_W_Contacts_Body3">
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  Hi, how are you samim?
                  <span className="msg_time">8:40 AM, Today</span>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                  Hi Khalid i am good tnx how about you?
                  <span className="msg_time_send">8:55 AM, Today</span>
                </div>
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img_msg"  />
                </div>
              </div>
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  I am good too, thank you for your chat template
                  <span className="msg_time">9:00 AM, Today</span>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                  You are welcome
                  <span className="msg_time_send">9:05 AM, Today</span>
                </div>
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img_msg"  />
                </div>
              </div>
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  I am looking for your next templates
                  <span className="msg_time">9:07 AM, Today</span>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                  Ok, thank you have a good day
                  <span className="msg_time_send">9:10 AM, Today</span>
                </div>
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img_msg"  />
                </div>
              </div>
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  Bye, see you
                  <span className="msg_time">9:12 AM, Today</span>
                </div>
              </div>
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  Hi, how are you samim?
                  <span className="msg_time">8:40 AM, Today</span>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                  Hi Khalid i am good tnx how about you?
                  <span className="msg_time_send">8:55 AM, Today</span>
                </div>
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img_msg"  />
                </div>
              </div>
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  I am good too, thank you for your chat template
                  <span className="msg_time">9:00 AM, Today</span>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                  You are welcome
                  <span className="msg_time_send">9:05 AM, Today</span>
                </div>
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img_msg"  />
                </div>
              </div>
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  I am looking for your next templates
                  <span className="msg_time">9:07 AM, Today</span>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                  Ok, thank you have a good day
                  <span className="msg_time_send">9:10 AM, Today</span>
                </div>
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/2.jpg" className="rounded-circle user_img_msg"  />
                </div>
              </div>
              <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src="assets/images/avatar/1.jpg" className="rounded-circle user_img_msg"  />
                </div>
                <div className="msg_cotainer">
                  Bye, see you
                  <span className="msg_time">9:12 AM, Today</span>
                </div>
              </div>
            </div>
            <div className="card-footer type_msg">
              <div className="input-group">
                <textarea className="form-control" placeholder="Type your message..." defaultValue={""} />
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary"><i className="fa fa-location-arrow" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="alerts" role="tabpanel">
          <div className="card mb-sm-3 mb-md-0 contacts_card">
            <div className="card-header chat-list-header text-center">
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><circle fill="#000000" cx={5} cy={12} r={2} /><circle fill="#000000" cx={12} cy={12} r={2} /><circle fill="#000000" cx={19} cy={12} r={2} /></g></svg></a>
              <div>
                <h6 className="mb-1">Notications</h6>
                <p className="mb-0">Show All</p>
              </div>
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" /><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" /></g></svg></a>
            </div>
            <div className="card-body contacts_body p-0 dlab-scroll" id="DLAB_W_Contacts_Body1">
              <ul className="contacts">
                <li className="name-first-letter">SEVER STATUS</li>
                <li className="active">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont primary">KK</div>
                    <div className="user_info">
                      <span>David Nester Birthday</span>
                      <p className="text-primary">Today</p>
                    </div>
                  </div>
                </li>
                <li className="name-first-letter">SOCIAL</li>
                <li>
                  <div className="d-flex bd-highlight">
                    <div className="img_cont success">RU</div>
                    <div className="user_info">
                      <span>Perfection Simplified</span>
                      <p>Jame Smith commented on your status</p>
                    </div>
                  </div>
                </li>
                <li className="name-first-letter">SEVER STATUS</li>
                <li>
                  <div className="d-flex bd-highlight">
                    <div className="img_cont primary">AU</div>
                    <div className="user_info">
                      <span>AharlieKane</span>
                      <p>Sami is online</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex bd-highlight">
                    <div className="img_cont info">MO</div>
                    <div className="user_info">
                      <span>Athan Jacoby</span>
                      <p>Nargis left 30 mins ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer" />
          </div>
        </div>
        <div className="tab-pane fade" id="notes">
          <div className="card mb-sm-3 mb-md-0 note_card">
            <div className="card-header chat-list-header text-center">
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect fill="#000000" x={4} y={11} width={16} height={2} rx={1} /><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x={4} y={11} width={16} height={2} rx={1} /></g></svg></a>
              <div>
                <h6 className="mb-1">Notes</h6>
                <p className="mb-0">Add New Nots</p>
              </div>
              <a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" /><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" /></g></svg></a>
            </div>
            <div className="card-body contacts_body p-0 dlab-scroll" id="DLAB_W_Contacts_Body2">
              <ul className="contacts">
                <li className="active">
                  <div className="d-flex bd-highlight">
                    <div className="user_info">
                      <span>New order placed..</span>
                      <p>10 Aug 2020</p>
                    </div>
                    <div className="ms-auto">
                      <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-" /></a>
                      <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex bd-highlight">
                    <div className="user_info">
                      <span>Youtube, a video-sharing website..</span>
                      <p>10 Aug 2020</p>
                    </div>
                    <div className="ms-auto">
                      <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-" /></a>
                      <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex bd-highlight">
                    <div className="user_info">
                      <span>john just buy your product..</span>
                      <p>10 Aug 2020</p>
                    </div>
                    <div className="ms-auto">
                      <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-" /></a>
                      <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex bd-highlight">
                    <div className="user_info">
                      <span>Athan Jacoby</span>
                      <p>10 Aug 2020</p>
                    </div>
                    <div className="ms-auto">
                      <a href="javascript:void(0);" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-" /></a>
                      <a href="javascript:void(0);" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/***********************************
      Chat box End
  ************************************/}
  {/***********************************
      Header start
  ************************************/}
  <div className="header">
    <div className="header-content">
      <nav className="navbar navbar-expand">
        <div className="container d-block my-0">
          <div className="d-flex align-items-center justify-content-sm-between justify-content-end">
            <div className="header-left">
              <div className="nav-item d-flex align-items-center">
                <div className="d-flex header-bx">									
                  <select className="selectpicker">
                    <option data-icon="fa-solid fa-location-dot mx-2">India</option>
                    <option data-icon="fa-solid fa-location-dot mx-2">Nepal</option>
                    <option data-icon="fa-solid fa-location-dot mx-2">Bangladesh</option>
                    <option data-icon="fa-solid fa-location-dot mx-2">Brazil</option>
                    <option data-icon="fa-solid fa-location-dot mx-2">China</option> 
                    <option data-icon="fa-solid fa-location-dot mx-2">Denmark</option> 
                    <option data-icon="fa-solid fa-location-dot mx-2">Germany</option>
                    <option data-icon="fa-solid fa-location-dot mx-2">Japan</option>
                    <option data-icon="fa-solid fa-location-dot mx-2">Lithuania</option>
                  </select>
                  <div className="input-group search-area2 ps-3" id="Serach-bar">
                    <span className="input-group-text h-search"><a href="javascript:void(0)"><svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.3" d="M16.6751 19.4916C16.2195 19.036 16.2195 18.2973 16.6751 17.8417C17.1307 17.3861 17.8694 17.3861 18.325 17.8417L22.9917 22.5084C23.4473 22.964 23.4473 23.7027 22.9917 24.1583C22.5361 24.6139 21.7974 24.6139 21.3417 24.1583L16.6751 19.4916Z" fill="var(--primary)" />
                          <path d="M12.8333 18.6667C16.055 18.6667 18.6666 16.055 18.6666 12.8333C18.6666 9.61168 16.055 7 12.8333 7C9.61163 7 6.99996 9.61168 6.99996 12.8333C6.99996 16.055 9.61163 18.6667 12.8333 18.6667ZM12.8333 21C8.32297 21 4.66663 17.3437 4.66663 12.8333C4.66663 8.32301 8.32297 4.66667 12.8333 4.66667C17.3436 4.66667 21 8.32301 21 12.8333C21 17.3437 17.3436 21 12.8333 21Z" fill="var(--primary)" />
                        </svg>
                      </a></span>
                    <input type="text" className="form-control" placeholder="What do you want eat today" />
                  </div>
                  <div className="search-drop">
                    <div className="card tag-bx">
                      <div className="card-header d-block border-0">
                        <h4>Recently Searched</h4>
                        <ul className="d-flex align-items-center flex-wrap">
                          <li><a href="javascript:void(0);" className="btn btn-outline-light btn-rounded me-2">Bakery</a></li>		
                          <li><a href="javascript:void(0);" className="btn btn-outline-light btn-rounded me-2">Burger</a></li>																
                          <li><a href="javascript:void(0);" className="btn btn-outline-light btn-rounded me-2">Beverage</a></li>	
                          <li><a href="javascript:void(0);" className="btn btn-outline-light btn-rounded me-2">Chicken</a></li>															
                          <li><a href="javascript:void(0);" className="btn btn-outline-light btn-rounded mt-3 mt-xl-0">Pizza</a></li>
                        </ul>
                      </div>
                      <div className="card-body pt-0">
                        <h4>popular Cuisines</h4>
                        <div className="swiper mySwiper-4">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="card mb-0">
                                <div className="card-body pb-2 pt-3">
                                  <div className="text-center pop-cousin">
                                    <img src="assets/images/popular-img/pic-1.jpg"  />
                                    <a href="javascript:void(0);"><h6>Fish Burger</h6></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="card mb-0">
                                <div className="card-body pb-2 pt-3">
                                  <div className="text-center pop-cousin">
                                    <img src="assets/images/popular-img/pic-1.jpg"  />
                                    <a href="javascript:void(0);"><h6>Fish Burger</h6></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="card mb-0">
                                <div className="card-body pb-2 pt-3">
                                  <div className="text-center pop-cousin">
                                    <img src="assets/images/popular-img/pic-1.jpg"  />
                                    <a href="javascript:void(0);"><h6>Fish Burger</h6></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="card mb-0">
                                <div className="card-body pb-2 pt-3">
                                  <div className="text-center pop-cousin">
                                    <img src="assets/images/popular-img/pic-1.jpg"  />
                                    <a href="javascript:void(0);"><h6>Fish Burger</h6></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="card mb-0">
                                <div className="card-body pb-2 pt-3">
                                  <div className="text-center pop-cousin">
                                    <img src="assets/images/popular-img/pic-1.jpg"  />
                                    <a href="javascript:void(0);"><h6>Fish Burger</h6></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="swiper-slide">
                              <div className="card mb-0">
                                <div className="card-body pb-2 pt-3">
                                  <div className="text-center pop-cousin">
                                    <img src="assets/images/popular-img/pic-1.jpg"  />
                                    <a href="javascript:void(0);"><h6>Fish Burger</h6></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="close-searchbox" />
                  </div>
                </div>
              </div>
            </div>
            <ul className="navbar-nav header-right ">
              <li className="nav-item d-flex align-items-center">
              </li>
              <li>
                <div className="dropdown header-profile2 ">
                  <a className="nav-link " href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                    <div className="header-info2 d-flex align-items-center">
                      <img src="assets/images/banner-img/pic-1.png"  />
                      <div className="d-flex align-items-center sidebar-info">
                        <div>
                          <h6 className="font-w500 mb-0 ms-2">Pollob Ahmed Sagor</h6>
                        </div>	
                        <i className="fas fa-chevron-down" />
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a href="app-profile.html" className="dropdown-item ai-icon ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                      <span className="ms-2">Profile</span>
                    </a>
                    <a href="email-inbox.html" className="dropdown-item ai-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      <span className="ms-2">Inbox</span>
                    </a>
                    <a href="edit-profile.html" className="dropdown-item ai-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      <span className="ms-2">Edit Profile</span>
                    </a>
                    <a href="message.html" className="dropdown-item ai-icon ">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path d="M21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L5,18 C3.34314575,18 2,16.6568542 2,15 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 Z M6.16794971,10.5547002 C7.67758127,12.8191475 9.64566871,14 12,14 C14.3543313,14 16.3224187,12.8191475 17.8320503,10.5547002 C18.1384028,10.0951715 18.0142289,9.47430216 17.5547002,9.16794971 C17.0951715,8.86159725 16.4743022,8.98577112 16.1679497,9.4452998 C15.0109146,11.1808525 13.6456687,12 12,12 C10.3543313,12 8.9890854,11.1808525 7.83205029,9.4452998 C7.52569784,8.98577112 6.90482849,8.86159725 6.4452998,9.16794971 C5.98577112,9.47430216 5.86159725,10.0951715 6.16794971,10.5547002 Z" fill="var(--primary)" />
                        </g>
                      </svg>
                      <span className="ms-2">Message</span>
                    </a>
                    <a href="notification.html" className="dropdown-item ai-icon ">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="var(--primary)" />
                          <circle fill="var(--primary)" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
                        </g>
                      </svg>
                      <span className="ms-2">Notification </span>
                    </a>
                    <a href="setting.html" className="dropdown-item ai-icon ">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path d="M18.6225,9.75 L18.75,9.75 C19.9926407,9.75 21,10.7573593 21,12 C21,13.2426407 19.9926407,14.25 18.75,14.25 L18.6854912,14.249994 C18.4911876,14.250769 18.3158978,14.366855 18.2393549,14.5454486 C18.1556809,14.7351461 18.1942911,14.948087 18.3278301,15.0846699 L18.372535,15.129375 C18.7950334,15.5514036 19.03243,16.1240792 19.03243,16.72125 C19.03243,17.3184208 18.7950334,17.8910964 18.373125,18.312535 C17.9510964,18.7350334 17.3784208,18.97243 16.78125,18.97243 C16.1840792,18.97243 15.6114036,18.7350334 15.1896699,18.3128301 L15.1505513,18.2736469 C15.008087,18.1342911 14.7951461,18.0956809 14.6054486,18.1793549 C14.426855,18.2558978 14.310769,18.4311876 14.31,18.6225 L14.31,18.75 C14.31,19.9926407 13.3026407,21 12.06,21 C10.8173593,21 9.81,19.9926407 9.81,18.75 C9.80552409,18.4999185 9.67898539,18.3229986 9.44717599,18.2361469 C9.26485393,18.1556809 9.05191298,18.1942911 8.91533009,18.3278301 L8.870625,18.372535 C8.44859642,18.7950334 7.87592081,19.03243 7.27875,19.03243 C6.68157919,19.03243 6.10890358,18.7950334 5.68746499,18.373125 C5.26496665,17.9510964 5.02757002,17.3784208 5.02757002,16.78125 C5.02757002,16.1840792 5.26496665,15.6114036 5.68716991,15.1896699 L5.72635306,15.1505513 C5.86570889,15.008087 5.90431906,14.7951461 5.82064513,14.6054486 C5.74410223,14.426855 5.56881236,14.310769 5.3775,14.31 L5.25,14.31 C4.00735931,14.31 3,13.3026407 3,12.06 C3,10.8173593 4.00735931,9.81 5.25,9.81 C5.50008154,9.80552409 5.67700139,9.67898539 5.76385306,9.44717599 C5.84431906,9.26485393 5.80570889,9.05191298 5.67216991,8.91533009 L5.62746499,8.870625 C5.20496665,8.44859642 4.96757002,7.87592081 4.96757002,7.27875 C4.96757002,6.68157919 5.20496665,6.10890358 5.626875,5.68746499 C6.04890358,5.26496665 6.62157919,5.02757002 7.21875,5.02757002 C7.81592081,5.02757002 8.38859642,5.26496665 8.81033009,5.68716991 L8.84944872,5.72635306 C8.99191298,5.86570889 9.20485393,5.90431906 9.38717599,5.82385306 L9.49484664,5.80114977 C9.65041313,5.71688974 9.7492905,5.55401473 9.75,5.3775 L9.75,5.25 C9.75,4.00735931 10.7573593,3 12,3 C13.2426407,3 14.25,4.00735931 14.25,5.25 L14.249994,5.31450877 C14.250769,5.50881236 14.366855,5.68410223 14.552824,5.76385306 C14.7351461,5.84431906 14.948087,5.80570889 15.0846699,5.67216991 L15.129375,5.62746499 C15.5514036,5.20496665 16.1240792,4.96757002 16.72125,4.96757002 C17.3184208,4.96757002 17.8910964,5.20496665 18.312535,5.626875 C18.7350334,6.04890358 18.97243,6.62157919 18.97243,7.21875 C18.97243,7.81592081 18.7350334,8.38859642 18.3128301,8.81033009 L18.2736469,8.84944872 C18.1342911,8.99191298 18.0956809,9.20485393 18.1761469,9.38717599 L18.1988502,9.49484664 C18.2831103,9.65041313 18.4459853,9.7492905 18.6225,9.75 Z" fill="var(--primary)" fillRule="nonzero" opacity="0.3" />
                          <path d="M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="var(--primary)" />
                        </g>
                      </svg>
                      <span className="ms-2">Settings </span>
                    </a>
                    <a className="dropdown-item ai-icon ms-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg>
                      <span className="ms-1" onClick={handleLogout}>Logout </span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
  {/***********************************
      Header end ti-comment-
  ************************************/}
  {/***********************************
      Sidebar start
  ************************************/}
  <Sidebar/>
  {/***********************************
      Sidebar end
  ************************************/}
  {/***********************************
      Content body start
  ************************************/}
  <div className="content-body">
    {/* row */}
    <div className="container">
      <div className="row">
         <Outlet/>
      </div>
    </div>
    {/* modal-box */}
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Location Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body add-loaction">
            <div className="row">
              <div className="col-xl-12">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Location Name</label>
                    <input type="Text" className="form-control" placeholder="HOUSE/FLAT/BLOCK NO." />
                  </div>
                </form>
              </div>
              <div className="col-xl-12">
                <form>
                  <div className="mb-3">
                    <label className="form-label">LANDMARK</label>
                    <input type="Text" className="form-control" placeholder="LANDMARK" />
                  </div>
                </form>
              </div>
              <div className="col-xl-6">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Available For Order</label>
                    <input type="Text" className="form-control" placeholder="Yes" />
                  </div>
                </form>
              </div>
              <div className="col-xl-6">
                <p className="mb-1">Address type</p>
                <select className="form-control default-select ms-0 py-4 wide" style={{display: 'none'}}>
                  <option>Home</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel2">Manage Route Notes</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body add-note">
            <div className="row align-items-center">
              <div className="col-xl-12">
                <form className="mb-3">
                  <label className="form-label">Update Type</label>
                  <input type="Text" className="form-control" placeholder="Drop Off Occurred" />
                </form>
              </div>
              <div className="col-xl-12">
                <form className=" mb-3"> 
                  <label className="form-label">Drop Off Location</label>
                  <input type="Text" className="form-control" placeholder="Front Door" />
                </form>
              </div>
              <div className="col-xl-12">
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" placeholder="Delivery was successful." id="floatingTextarea" defaultValue={""} />
                </div>
              </div>
              <div className="col-xl-12">
                <div className="mb-3">
                  <label className="from-label">Address</label>
                  <input type="Text" className="form-control" placeholder="Elm Street, 23" />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Button trigger modal */}
  {/***********************************
      Content body end
  ************************************/}
  {/***********************************
      Footer start
  ************************************/}
  <Footer/>
  {/***********************************
      Footer end
  ************************************/}
  {/***********************************
     Support ticket button start
  ************************************/}
  {/***********************************
     Support ticket button end
  ************************************/}
</div>









    
    </>
  )
}

export default Layout