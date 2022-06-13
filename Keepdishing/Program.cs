using Keepdishing.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.FileProviders;

#region Builder

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;

}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddRazorPages();

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "react-app/dist";
});

#endregion

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();


app.UseAuthentication();
app.UseAuthorization();


app.MapRazorPages();

app.MapWhen(httpContext => !httpContext.Request.Path.StartsWithSegments("/Identity"), spa =>
{
    spa.UseSpa(spa =>
    {
        spa.Options.SourcePath = "react-app";
        spa.Options.DevServerPort = 3000;

        if (app.Environment.IsDevelopment())
        {
            spa.UseProxyToSpaDevelopmentServer($"http://localhost:{spa.Options.DevServerPort}/");

        }
    });
});

//app.MapFallbackToFile("index.html");

app.Run();
