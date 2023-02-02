import axios from 'axios'
import React, {useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '~/App'

const Login = () => {
  const navigate= useNavigate()
  const [account, setAccount]= useState("")
  const [password, setPassword]= useState("")
  const {setAuth, setUser}= useContext(AppContext)
  const login =async ()=>{ 
    const res= await axios({
      url: "http://localhost:4000/login",
      method: "post",
      data: {
        account, password
      }
    })
    const result= await res.data
    if(result.login === true ) {
      setAuth(true)
      setUser(result)
      navigate("/")
    }
    else {
      setAuth(false)
    }
  }
  return (
    <div style={{width :'100%', color: "#fff"}}>
      <div style={{textAlign: "center", fontSize: 20, fontWeight: 600}}>Đăng nhập</div>
      <br />
      <div style={{width: "100%"}} className={"c-flex-center"}>
        <div style={{width: "100%", maxWidth: 400}}>
          <div style={{marginBottom: 8}}>Tài khoản</div>
          <div style={{width: '100%'}}>
            {/* Tính đa hình */}
            <ComponentInput value={account} setValue={setAccount} type={"text"} />
          </div>
          <br />
          <div style={{marginBottom: 8}}>Mật khẩu</div>
          <div style={{width: '100%'}}>
            {/* Tính đa hình */}
            <ComponentInput value={password} setValue={setPassword} type={"password"} />
          </div>
          <br />
          <div style={{width: '100%'}} className={"c-flex-center"}>
            <button onClick={login} style={{width: 120, height: 40, background: "#2e89ff", color: "#fff", fontWeight: 600, borderRadius: 80, cursor: "pointer", border: "none", outline: "none"}} className={"c-flex-center"}>
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

// kế thừa
class ComponentInput extends React.Component {
  constructor(props) {
    super(props)
  }
  // tính đóng gói
  Check() {
      console.log('Checking...');
  }
  render() {
    return (
      <input value={this.props.value} onChange={(e)=> this.props.setValue(e.target.value)} type={this.props.type} style={{width: "100%", height: 40, borderRadius: 80, border: "none", outlineColor: "#2e89ff", padding: 10, fontSize: 16, background: "#e8f0fe"}} />
    )
  }
}