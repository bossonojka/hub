<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html>
	<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Orders</title>
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
        		<th>Product</th>
        		<th>Provider</th>
        		<th>Quantity</th>
        		<th>Total</th>
        		<th>Options</th>
	        </tr>
	    	<c:forEach var = "order" items="${requestScope.orders}">
	        	<tr>
	        		<td class="id">${order.id}</td>
	        		<td>${order.product.manufacturer.name} ${order.product.name}</td>
	        		<td>${order.provider.name}</td>
	        		<td>${order.quantity}</td>
	        		<td>${order.quantity * order.product.price}</td>
	        		<td>
	        			<form method="POST" action="OrderDelete">
	        				<input hidden name="order" value="${order.id}">
	        				<input type="submit" value="Delete">
	        			</form>
	        			<form method="GET" action="OrderEdit">
	        				<input hidden name="order" value="${order.id}">
	        				<input type="submit" value="Edit">
	        			</form>
	        		</td>
	        	</tr>
	      	</c:forEach>
	      	<tr>
		      	<form method="POST" action="OrderCreate">
		      		<td class="id">*</td>
		      		<td><select name="product">
		      			<c:forEach var = "product" items="${applicationScope.products}">	
		      				<option value="${product.id}">${product.manufacturer.name} ${product.name}</option>
		      			</c:forEach>
		      		</select></td>
		      		<td><select name="provider">
		      			<c:forEach var = "provider" items="${applicationScope.providers}">
		      				<option value="${provider.id}">${provider.name}</option>
		      			</c:forEach>
		      		</select></td>
		      		<td><input type="text" name="quantity" placeholder="Quantity"></td>
		      		<td><input type="text" readonly placeholder="Will be calculated"></td>
		      		<td><input type="submit" value="Add"></td>
		      	</form>
	      	</tr>
	      	<tr>
		      	<form method="POST" action="OrderEdit">
		      		<td class="id"><input type="text" readonly size="1" name="order" value="${requestScope.order.id}"></td>
		      		<td><select name="product">
		      			<c:forEach var = "product" items="${applicationScope.products}">	
		      				<option value="${product.id}">${product.manufacturer.name} ${product.name}</option>
		      			</c:forEach>
		      		</select></td>
		      		<td><select name="provider">
		      			<c:forEach var = "provider" items="${applicationScope.providers}">
		      				<option value="${provider.id}">${provider.name}</option>
		      			</c:forEach>
		      		</select></td>
		      		<td><input type="text" name="quantity" value="${requestScope.order.quantity }" placeholder="Quantity"></td>
		      		<td><input type="text" readonly placeholder="Will be calculated"></td>
		      		<td><input type="submit" value="Edit"></td>
		      	</form>
	      	</tr>
    	</table>
    	<form action="Orders" method="POST">
			<lable for="providerPico">Filter by provider:</lable>
			<select id="providerPico" name="provider">
				<c:forEach var = "provider" items="${applicationScope.providers}">	
		      		<option value="${provider.name}">${provider.name}</option>
		      	</c:forEach>
			</select>
			<input type="submit" value="Filter">
		</form>
    </body>
</html>
