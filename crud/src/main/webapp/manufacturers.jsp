<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Manufacturers</title>
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
       		<th>Options</th>
        </tr>
    	<c:forEach var = "manufacturer" items="${requestScope.manufacturers}">
        	<tr>
        		<td class="id">${manufacturer.id}</td>
        		<td>${manufacturer.name}</td>
        		<td>
        			<form method="POST" action="ManufacturerDelete">
        				<input hidden name="manufacturer" value="${manufacturer.id}">
        				<input type="submit" value="Delete">
        			</form>
        			<form method="GET" action="ManufacturerEdit">
        				<input hidden name="manufacturer" value="${manufacturer.id}">
        				<input type="submit" value="Edit">
        			</form>
        		</td>
        	</tr>
      	</c:forEach>
      	<tr>
	      	<form method="POST" action="ManufacturerCreate">
	      		<td class="id">*</td>
	      		<td><input type="text" name="name" placeholder="Name"></td>
	      		<td><input type="submit" value="Add"></td>
	      	</form>
      	</tr>
      	<tr>
	      	<form method="POST" action="ManufacturerEdit">
	      		<td class="id"><input type="text" readonly size="1" name="manufacturer" value="${requestScope.manufacturer.id}"></td>
	      		<td><input type="text" name="name" value="${requestScope.manufacturer.name}"></td>
	      		<td><input type="submit" value="Edit"></td>
	      	</form>
      	</tr>
   	</table>
</body>
</html>