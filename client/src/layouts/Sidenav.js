import jwt from 'jsonwebtoken'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {sidenav} from '../utility/constant'

class Sidenav extends Component {

    constructor(props){
        super(props)
        this.state={
            catId: null,
            userName: jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data.userName : ''
        }
    }

    handleToggle = (id) => {
        if(this.state.catId === id){
            this.setState({
                catId: null
            })
        } else {
            this.setState({
                catId: id
            })
        }
    }

    renderCategory = () => {
        const {sideNav} = this.props
        const {pathname} = this.props.location
        const {userType} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        return(
            <>
                {sidenav.map((items, index) => {
                    return(
                        <div key={index + 20}>
                            {(userType !== 1 && items.id === 1) ? null : <>
                                <p className={`${sideNav ? 'justify-content-center' : 'justify-content-between'} d-flex align-items-center px-4 f-16px ui-cat-title m-0`} onClick={() => {this.handleToggle(index)}} key={index}><i className={`${items.icon} ${sideNav ? 'f-22px' : 'mr-3'}`}></i> {!sideNav && <>{items.name} <i className="ml-2 fas fa-caret-down"></i></>}</p>
                                {items.subCat && <div className={`ui-subcategory ${sideNav && 'p-0'}`} style={{height: this.state.catId === index ? 'auto' : 0}}>
                                    {items.categories.map((subItems, key) => (
                                        <>
                                            <p key={key + 10} className={`m-0 pl-4 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}><a key={subItems.id} href={subItems.link}><i className={`${subItems.icon} ${sideNav ? 'f-22px' : 'mr-3'}`}></i> {!sideNav && subItems.name}</a></p>
                                        </>
                                    ))}
                                </div>}
                            </>}
                        </div>
                    )
                })}
            </>
        )
    }

    render(){
        const {sideNav} = this.props
        const {userName} = this.state
        const {image} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''

        return(
            <div className='h-100 ui-sidenav'>
                <div className='ui-user-details' style={{justifyContent: sideNav && 'center'}}>
                    {!sideNav && <div>
                    <img className={'ui-user-avatar'} src={'http://localhost:5000/' + image} alt={'user'} />{userName}
                    </div>}
                    <i onClick={this.props.handleSideNav} className="fas fa-bars"></i>
                </div>
                <div className='ui-sidenav'>
                    {!sideNav && <small className='ml-4 mb-1 mt-3'>Home</small>}
                    <p className={`f-16px ui-cat-title m-0 ${sideNav ? 'text-center' : 'px-4'}`}><Link to={'/'} ><i className={`fas fa-home ${sideNav ? 'f-22px' : ' mr-3'}`}></i> {!sideNav && 'Homepage'}</Link></p>
                    {!sideNav && <small className='ml-4 mb-1 mt-3'>Main</small>}
                    {this.renderCategory()}
                    {!sideNav && <small className='ml-4 mb-1 mt-3'>User</small>}
                    <p className={`f-16px ui-cat-title m-0 ${sideNav ? 'text-center' : 'px-4'}`}> <Link to={'/profile'}> <i className={` far fa-address-card  ${sideNav ? 'f-22px' : ' mr-3'}`}></i>{ !sideNav && 'Update Profile'} </Link></p>
                    <p className={`f-16px ui-cat-title m-0 ${sideNav ? 'text-center' : 'px-4'}`}> <Link to={'/pass-reset'}> <i className={` fas fa-cog ${sideNav ? 'f-22px' : ' mr-3'}`}></i>{ !sideNav && 'Change Password' } </Link></p>
                    <p onClick={() => {localStorage.removeItem('user')}} className={`f-16px ui-cat-title m-0 ${sideNav ? 'text-center' : 'px-4'}`}> <a href={'/'}><i className={`fas fa-sign-out-alt ${sideNav ? 'f-22px' : 'mr-3'}`}></i>{ !sideNav && 'LOG OUT' }</a></p>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidenav)