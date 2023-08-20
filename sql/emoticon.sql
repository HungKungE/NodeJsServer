CREATE TABLE emoticon (
  emoticon_id INT NOT NULL AUTO_INCREMENT,
  emoticon_name VARCHAR(255) NOT NULL UNIQUE,
  create_time TIMESTAMP NOT NULL,
  edit_time TIMESTAMP NOT NULL,
  PRIMARY KEY (emoticon_id)
);

CREATE TABLE emoticon_uploader (
  uploader_id INT NOT NULL,
  emoticon_id INT NOT NULL,
  PRIMARY KEY (uploader_id, emoticon_id),
  FOREIGN KEY (uploader_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
  FOREIGN KEY (emoticon_id) REFERENCES emoticon(emoticon_id) ON DELETE CASCADE
);

CREATE TABLE emoticon_usage (
  requester_id INT NOT NULL,
  emoticon_id INT NOT NULL,
  PRIMARY KEY (requester_id, emoticon_id),
  FOREIGN KEY (requester_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
  FOREIGN KEY (emoticon_id) REFERENCES emoticon(emoticon_id) ON DELETE CASCADE
); 

CREATE TABLE emoticon_item (
  emoticon_item_id INT NOT NULL AUTO_INCREMENT,
  emoticon_id INT NOT NULL,
  emoticon_item_name VARCHAR(255) NOT NULL,
  is_main_image BOOLEAN NOT NULL,
  upload_time TIMESTAMP NOT NULL,
  PRIMARY KEY (emoticon_item_id),
  FOREIGN KEY (emoticon_id) REFERENCES emoticon(emoticon_id) ON DELETE CASCADE
);