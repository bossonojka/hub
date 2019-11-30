<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html>
	<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Providers</title>
        <link rel="stylesheet" href="styles/main.css">
        <link rel="stylesheet" href="styles/dropdown.css">
    </head>
    <body>
	   	<div class="navigator">
			<div class="dropdown">
			  <a href="/hibernate">Products</a>
			  <div class="dropdown-content">
			    <a href="Manufacturers">Manufacturers</a>
			  </div>
			</div>
			<a href="Orders">Orders</a>
			<a href="Providers">Providers</a>
		</div>
    	<table border="1" cellpadding="5">
    		<tr>
    			<th>Id</th>
        		<th>Name</th>
        		<th>Email</th>
        		<th>Options</th>
	        </tr>
	    	<c:forEach var = "provider" items="${requestScope.providers}">
	        	<tr>
	        		<td class="id">${provider.id}</td>
	        		<td>${provider.name}</td>
	        		<td>${provider.email}</td>
	        		<td>
	        			<form method="POST" action="ProviderDelete">
	        				<input hidden name="provider" value="${provider.id}">
	        				<input type="submit" value="Delete">
	        			</form>
	        			<form method="GET" action="ProviderEdit">
	        				<input hidden name="provider" value="${provider.id}">
	        				<input type="submit" value="Edit">
	        			</form>
	        		</td>
	        	</tr>
	      	</c:forEach>
	      	<tr>
		      	<form method="POST" action="ProviderCreate">
		      		<td class="id">*</td>
		      		<td><input type="text" name="name" placeholder="Name"></td>
		      		<td><input type="email" name="email" placeholder="Email"></td>
		      		<td><input type="submit" value="Add"></td>
		      	</form>
	      	</tr>
	      	<tr>
		      	<form method="POST" action="ProviderEdit">
		      		<td class="id"><input type="text" readonly size="1" name="provider" value="${requestScope.provider.id}"></td>
		      		<td><input type="text" name="name" value="${requestScope.provider.name}"></td>
		      		<td><input type="email" name="email" value="${requestScope.provider.email}"></td>
		      		<td><input type="submit" value="Edit"></td>
		      	</form>
	      	</tr>
    	</table>
    	<form id="email" action="EmailCreate" method="post">
			<lable for="email">Email:</lable>
			<input id="email" type="text" name="email">
			<select id="domain" name="domain">
				<option value="@gmail.com">@gmail.com</option>
			</select>
			<lable for="password">Password:</lable>
			<input id="password" type="password" name="password">
			<lable for="attachment">Attachment:</lable>
			<select id="attachment" name="table">
				<option value="all">All</option>
				<option value="orders">Orders</option>
				<option value="products">Products</option>
				<option value="providers">Providers</option>
				<option value="manufacturers">Manufacturers</option>
			</select>
			<input type="submit" value="Send">
			<span class="error">${requestScope.error}</span>
			<span class="success">${requestScope.success}</span>
		</form>
		<p>Click <a href="https://myaccount.google.com/u/0/lesssecureapps?utm_source=google-account&utm_medium=web">here</a> to allow insecure applications in your Google account.</p>
    </body>
</html>
