package hibernate.models;

import java.io.File;
import java.util.ArrayList;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.AuthenticationFailedException;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class Email {
	private String to;
	private String subject;
	private String msg;
	private ArrayList<File> files;
	
	private String email;
	private String password;
	
	public Email() {
		
	};
	
	public Email(String to, String subject, String msg, ArrayList<File> files, String email, String password) {
		super();
		this.to = to;
		this.subject = subject;
		this.msg = msg;
		this.files = files;
		this.email = email;
		this.password = password;
	}
	
	public void send() throws AuthenticationFailedException, MessagingException{
		Properties props = new Properties();
		props.put("mail.smtp.auth", true);
		props.put("mail.smtp.starttls.enable", true);
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smpt.port", "465");
		props.put("mail.smtp.user", email);
		
		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(email, password);
			}
		});
		
		Message message = new MimeMessage(session);
		message.setFrom(new InternetAddress(email));
		message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(this.to));
		message.setSubject(this.subject);
		
		BodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setText(this.msg);
		
		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart);			
		
		for (File file : this.files) {
			messageBodyPart = new MimeBodyPart();
			
			DataSource source = new FileDataSource(file);
			messageBodyPart.setDataHandler(new DataHandler(source));
			messageBodyPart.setFileName(file.getName());
			multipart.addBodyPart(messageBodyPart);
		}
		
		message.setContent(multipart);
		
		Transport.send(message);
	}
}
