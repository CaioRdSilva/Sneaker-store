export function checkAuth(req, res, next) {
  const userId = req.session.userid;
  const userSeller = req.session.userseller;

  if (!userId) {
    res.redirect("/login")
    return
  }
  if (!userSeller) {
    res.redirect("/");
    return
  }

  next();
}


  

  