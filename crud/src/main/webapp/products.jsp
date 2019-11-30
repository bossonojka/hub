<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<!DOCTYPE html>
<html>
	<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Products</title>
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
        		<th>Manufacturer</th>
        		<th>Name</th>
        		<th>Price</th>
        		<th>Options</th>
	        </tr>
	    	<c:forEach var = "product" items="${requestScope.products}">
	        	<tr>
	        		<td class="id">${product.id}</td>
	        		<td>${product.manufacturer.name}</td>
	        		<td>${product.name}</td>
	        		<td>${product.price}</td>
	        		<td>
	        			<form method="POST" action="ProductDelete">
	        				<input hidden name="product" value="${product.id}">
	        				<input type="submit" value="Delete">
	        			</form>
	        			<form method="GET" action="ProductEdit">
	        				<input hidden name="product" value="${product.id}">
	        				<input type="submit" value="Edit">
	        			</form>
	        		</td>
	        	</tr>
	      	</c:forEach>
	      	<tr>
		      	<form method="POST" action="ProductCreate">
		      		<td class="id">*</td>
		      		<td><select name="manufacturer">
		      			<c:forEach var = "manufacturer" items="${applicationScope.manufacturers}">
							<option value="${manufacturer.id}">${manufacturer.name}</option>
	    				</c:forEach>
		      		</select></td>
		      		<td><input type="text" name="name" placeholder="Name"></td>
		      		<td><input type="text" name="price" placeholder="Price"></td>
		      		<td><input type="submit" value="Add"></td>
		      	</form>
	      	</tr>
	      	<tr>
		      	<form method="POST" action="ProductEdit">
		      		<td class="id"><input type="text" readonly size="1" name="product" value="${requestScope.product.id}"></td>
		      		<td><select name="manufacturer">
		      			<c:forEach var = "manufacturer" items="${applicationScope.manufacturers}">
							<option value="${manufacturer.id}">${manufacturer.name}</option>
	    				</c:forEach>
		      		</select></td>
		      		<td><input type="text" name="name" placeholder="Name" value="${requestScope.product.name}"></td>
		      		<td><input type="text" name="price" placeholder="Price" value="${requestScope.product.price}"></td>
		      		<td><input type="submit" value="Edit"></td>
		      	</form>
	      	</tr>
    	</table>
    	<form action="" method="POST">
			<lable for="manufacturerPico">Filter by manufacturer:</lable>
			<select id="manufacturerPico" name="manufacturer">
				<c:forEach var = "manufacturer" items="${applicationScope.manufacturers}">
					<option value="${manufacturer.id}">${manufacturer.name}</option>
	    		</c:forEach>
			</select>
			<input type="submit" value="Filter">
		</form>
    	<form action="XmlCreate" method="POST">
			<lable for="exportBtn">Export data to XML:</lable>
			<select name="type">
				<option value="products">Products only</option>
				<option value="orders">Orders only</option>
				<option value="providers">Providers only</option>
				<option value="manufacturers">Manufacturers only</option>
			</select>
			<input id="exportBtn" type="submit" value="Export">
		</form>
    </body>
</html>
