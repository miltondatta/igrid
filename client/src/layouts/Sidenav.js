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
        const {userType} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        return(
            <>
                {sidenav.map((items, index) => {
                    return(
                        <>
                        {(userType === 2 && items.id === 1) ? null : <>
                            <p className={`d-flex justify-content-between align-items-center px-4 f-16px ui-cat-title m-0`} onClick={() => {this.handleToggle(index)}} key={index}><i className={`${items.icon} mr-1`}></i> {items.name} <i className="ml-2 fas fa-caret-down"></i></p>
                            {items.subCat && <div className='ui-subcategory' style={{height: this.state.catId === index ? 'auto' : 0}}>
                                {items.categories.map((subItems, key) => (
                                    <>
                                        <p className={`m-0 pl-4 ${key===1 && 'ui-subcat-active'}`}><a key={subItems.id} href={subItems.link}><i className={`${subItems.icon} mr-1`}></i> {subItems.name}</a></p>
                                    </>
                                ))}
                            </div>}
                        </>}
                        </>
                    )
                })}
            </>
        )
    }

    render(){
        console.log(this.props)
        const {pathname} = this.props.location
        const {userName} = this.state
        const {image} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''

        return(
            <div className='h-100 ui-sidenav'>
                <div className='ui-user-details'>
                    <img className={'ui-user-avatar'} src={'http://localhost:5000/' + image} alt={'user'} />{userName}
                </div>
                <div className='ui-sidenav'>
                    <small className='ml-4 mb-1 mt-3'>Home</small>
                    <p className='f-16px px-4 ui-cat-title m-0'><Link to={'/'} ><i className="fas fa-home"></i> Homepage</Link></p>

                    <small className='ml-4 mb-1 mt-3'>Main</small>
                    {this.renderCategory()}
                
                    <small className='ml-4 mb-1 mt-3'>User</small>
                    <p className='f-16px px-4 ui-cat-title m-0'><i class="mr-2 far fa-address-card"></i> <Link to={'/profile'}>Update Profile</Link></p>
                    <p className='f-16px px-4 ui-cat-title m-0'><i class="mr-2 fas fa-cog"></i> <Link to={'/pass-reset'}>Change Password </Link></p>
                    <p onClick={() => {localStorage.removeItem('user')}} className='f-16px px-4 ui-cat-title m-0'><i class="mr-2 fas fa-sign-out-alt"></i> <a href={'/'}>LOG OUT</a></p>
                </div>
            </div>
        )
    }
    
}

export default withRouter(Sidenav)