module.exports.logoutAdmin = (req, res)=>{
    res.cookie("token", "");
    res.redirect("/login/admin");
}