CREATE TABLE folder (
  folder_id INT NOT NULL AUTO_INCREMENT,
  folder_name VARCHAR(255) NOT NULL UNIQUE,
  create_time TIMESTAMP NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  PRIMARY KEY (folder_id)
);

CREATE TABLE user_folder (
  user_id INT NOT NULL,
  folder_id INT NOT NULL,
  PRIMARY KEY (user_id, folder_id),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES folder(folder_id) ON DELETE CASCADE
);

CREATE TABLE image (
  img_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  img_name VARCHAR(255) NOT NULL UNIQUE,
  add_time TIMESTAMP NOT NULL
);

CREATE TABLE user_image (
  user_id INT NOT NULL,
  folder_id INT NOT NULL,
  img_id INT NOT NULL,
  PRIMARY KEY (user_id, folder_id, img_id),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES folder(folder_id) ON DELETE CASCADE,
  FOREIGN KEY (img_id) REFERENCES image(img_id) ON DELETE CASCADE
);