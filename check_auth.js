function check_in_loop(req,res)
{
    setInterval(()=>{
        console.log("checking...")
        if (!(req.cookies && req.cookies.token ))
        {
            
        return    res.redirect("/");
        
        }
    },500)
}