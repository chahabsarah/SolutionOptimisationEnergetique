from flask import Flask, request, jsonify, send_file
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from PIL import Image, ImageDraw, ImageFont

import io
import base64
import time
import logging


from flask_cors import CORS

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('elect')

def capture_half_page_screenshot(driver, position):
    if position == 0:
       # hiver_element = driver.find_element(By.XPATH, "//div[@class='titreoranger']")
        hiver_element = driver.find_element(By.XPATH, "//table[@width='630px']")
        driver.execute_script("arguments[0].scrollIntoView();", hiver_element)
        time.sleep(1)  # Wait for the scroll to finish

        # Capture the screenshot from 'Hiver' to 'Eté'
        screenshot = driver.get_screenshot_as_png()
        image = Image.open(io.BytesIO(screenshot))
        image.save("topimage.png")

        top =0
        bottom = image.height - 90  # Decrease only from the bottom by 50 pixels
        left = 0
        right = image.width  # Keep the full width
        
        cropped_image = image.crop((left, top, right, bottom))
        cropped_image.save("topcropped.png")
        return cropped_image
    elif position == 1:
        # Scroll to the element 'Eté' and capture from there to the end of the page
        ete_element = driver.find_element(By.XPATH, "//div[@class='soustitreoranger' and text()='Eté']")
        driver.execute_script("arguments[0].scrollIntoView();", ete_element)
        time.sleep(1)  # Wait for the scroll to finish
        
        # Capture the screenshot from the 'Eté' element to the bottom of the page
        screenshot = driver.get_screenshot_as_png()
        image = Image.open(io.BytesIO(screenshot))
        image.save("buttomimage.png")

        # Get the location and size of the 'Eté' element
        location = ete_element.location
        size = ete_element.size
        
        # Calculate the cropping area from the 'Eté' element to the bottom of the image
        top = location['y']-892
        bottom = image.height
        left = 0
        right = image.width
        
        cropped_image = image.crop((left, top, right, bottom))
        cropped_image.save("buttomcropped.png")

        return cropped_image


def combine_and_crop_images(image1, image2, output_file, padding=0):
    # Combine the images
    total_height = image1.height + image2.height
    combined_image = Image.new('RGB', (image1.width, total_height))
    combined_image.paste(image1, (0, 0))
    combined_image.paste(image2, (0, image1.height))
    
    # Calculate the cropping boundaries
    left = padding + 205  # Adjusting for left boundary with extra padding
    right = combined_image.width - padding - 200  # Adjusting for right boundary with extra padding
    top = 0 # No change in top boundary (starting from the top)
    bottom = combined_image.height-25  # No change in bottom boundary (full height)
    
    # Crop the image
    cropped_image = combined_image.crop((left, top, right, bottom))
    
    # Save the cropped image
    cropped_image.save(output_file)

    # Define the coordinates to remove the highlighted green area
    # These values might need adjustments based on the actual position in your image
    left = 20
    top = 8
    right = 4500
    bottom = 105

    # Create a blank area (white) to overwrite the green area
    draw = ImageDraw.Draw(cropped_image)
    draw.rectangle([left, top, right, bottom], fill="white")

    # Load logos
    steg_logo = Image.open("./steg.png")
    flowenergy_logo = Image.open("./energyflow.png")

    # Resize logos if needed (adjust sizes as necessary)
    steg_logo = steg_logo.resize((100, 100))
    flowenergy_logo = flowenergy_logo.resize((100, 100))

    # Paste logos on the image
    cropped_image.paste(flowenergy_logo, (left+100, top), flowenergy_logo)
    cropped_image.paste(steg_logo, (right - 3900, top), steg_logo)

    # Add the new text
    draw = ImageDraw.Draw(cropped_image)
    font = ImageFont.truetype("arial.ttf", 10)  # Make sure you have a suitable font file

    # Calculate text width and height for centering
    #( l'espace el twiiil lmawjoud khalih ma tnahichou eli f west chaine text)
    text = "          ENERGY FLOW EN COLLABORATION AVEC \n LA SOCIÉTÉ TUNISIENNE DE L'ÉLECTRICITÉ ET DU GAZ".upper()
    bbox = font.getbbox(text)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]

    # Position the text in the center
    text_x = (right - 3460 - left - text_width) // 2 + left
    text_y = (bottom - top - text_height) // 2 + top

    draw.text((text_x, text_y), text, fill="#063970", font=font)

    # Save the modified image
    cropped_image.save("combined_screenshotCollaborationElectric.png")

    print("Modified image saved as steg_simulated_bill_captured_mod electric.png")

@app.route('/estimate', methods=['POST'])
def capture():
    data = request.json
    try:
        driver = webdriver.Chrome()

        driver.get("https://steg.com.tn/fr/clients_res/estimez.php")
        time.sleep(2) 
        Select(driver.find_element(By.NAME, "lustre_lbc")).select_by_value(data['lustre_lbc']) 
        Select(driver.find_element(By.NAME, "lustre_li")).select_by_value(data['lustre_li']) 
        Select(driver.find_element(By.NAME, "nbh_lustre_li")).select_by_value(data["nbh_lustre_li"]) 
        Select(driver.find_element(By.NAME, "nbh_lustre_lbc")).select_by_value(data["nbh_lustre_lbc"]) 
        Select(driver.find_element(By.NAME, "lampes")).select_by_value(data["lampes"])  
        Select(driver.find_element(By.NAME, "nbh_lampes")).select_by_value(data["nbh_lampes"])	
        Select(driver.find_element(By.NAME, "neons")).select_by_value(data["neons"])
        Select(driver.find_element(By.NAME, "nbh_neons")).select_by_value(data["nbh_neons"])
        Select(driver.find_element(By.NAME, "lampes_eco")).select_by_value(data["lampes_eco"])
        Select(driver.find_element(By.NAME, "nbh_lampes_eco")).select_by_value(data["nbh_lampes_eco"])
        Select(driver.find_element(By.NAME, "tv_1")).select_by_value(data["tv_1"])
        Select(driver.find_element(By.NAME, "nbh_tv_1")).select_by_value(data["nbh_tv_1"])
        Select(driver.find_element(By.NAME, "tv_2")).select_by_value(data["tv_2"])
        Select(driver.find_element(By.NAME, "parabole_2")).select_by_value(data["parabole_2"])
        Select(driver.find_element(By.NAME, "nbh_tv_2")).select_by_value(data["nbh_tv_2"])
        Select(driver.find_element(By.NAME, "refrige_1")).select_by_value(data["refrige_1"])
        Select(driver.find_element(By.NAME, "refrige_2")).select_by_value(data["refrige_2"])
        Select(driver.find_element(By.NAME, "congelateur")).select_by_value(data["congelateur"])
        Select(driver.find_element(By.NAME, "four")).select_by_value(data["four"]) 
        Select(driver.find_element(By.NAME, "nb_repas_four")).select_by_value(data["nb_repas_four"]) 
        Select(driver.find_element(By.NAME, "micro_onde")).select_by_value(data["micro_onde"]) 
        Select(driver.find_element(By.NAME, "nb_repas_mon")).select_by_value(data["nb_repas_mon"]) 
        Select(driver.find_element(By.NAME, "chauffe_eau_ele")).select_by_value(data["chauffe_eau_ele"]) 
        Select(driver.find_element(By.NAME, "chauffe_eau_ele_cont")).select_by_value(data["chauffe_eau_ele_cont"]) 
        Select(driver.find_element(By.NAME, "nb_d_hiver")).select_by_value(data["nb_d_hiver"]) # Nombre de douches par personne et par semaine	  
        Select(driver.find_element(By.NAME, "nb_d_ete")).select_by_value(data["nb_d_ete"]) # Nombre de douches par personne et par semaine	  
        Select(driver.find_element(By.NAME, "nb_chuffage_ele_1")).select_by_value(data["nb_chuffage_ele_1"]) # Nombre 
        Select(driver.find_element(By.NAME, "type_chauffage_ele_1")).select_by_value(data["type_chauffage_ele_1"]) # Type (1,675 Bain d'huile) (0,750 Plaque chauffante)
        Select(driver.find_element(By.NAME, "nb_h_ch_e_1")).select_by_value(data["nb_h_ch_e_1"]) # 	Utilisation h/j 
        Select(driver.find_element(By.NAME, "nb_chuffage_ele_2")).select_by_value(data["nb_chuffage_ele_2"]) # Nombre 
        Select(driver.find_element(By.NAME, "type_chauffage_ele_2")).select_by_value(data["type_chauffage_ele_2"]) # Type (1,675 Bain d'huile) (0,750 Plaque chauffante)
        Select(driver.find_element(By.NAME, "nb_h_ch_e_2")).select_by_value(data["nb_h_ch_e_2"]) # 	Utilisation h/j 
        Select(driver.find_element(By.NAME, "nbr_clim_1")).select_by_value(data["nbr_clim_1"]) # 	nombre
        Select(driver.find_element(By.NAME, "pw_clim_1")).select_by_value(data["pw_clim_1"]) # 	BTU
        Select(driver.find_element(By.NAME, "nbr_h_clim_ete_1")).select_by_value(data["nbr_h_clim_ete_1"]) # 		Utilisation h/j:	Eté 
        Select(driver.find_element(By.NAME, "m_laver_1")).select_by_value(data["m_laver_1"]) # 	1 oui 0 non
        Select(driver.find_element(By.NAME, "type_m_laver_1")).select_by_value(data["type_m_laver_1"]) # 	0,45 Petite (Semi-automatique) 0,90 Grande (Automatique)
        Select(driver.find_element(By.NAME, "nbr_less_1")).select_by_value(data["nbr_less_1"]) 
        Select(driver.find_element(By.NAME, "fer_ar")).select_by_value(data["fer_ar"])
        Select(driver.find_element(By.NAME, "nbr_fer_ar")).select_by_value(data["nbr_fer_ar"])
        Select(driver.find_element(By.NAME, "nbr_micro_ordi")).select_by_value(data["nbr_micro_ordi"])
        Select(driver.find_element(By.NAME, "nbr_h_micro_ordi")).select_by_value(data["nbr_h_micro_ordi"])


        driver.find_element(By.NAME, "Input").click()

        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "titreoranger")))

        top_half = capture_half_page_screenshot(driver, position=0)

        bottom_half = capture_half_page_screenshot(driver, position=1)
        output_file = "combined_screenshotvElectric.png"
        combine_and_crop_images(top_half, bottom_half,  output_file, padding=20)
        with open(output_file, "rb") as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')

        return send_file(output_file, mimetype='image/png')
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
